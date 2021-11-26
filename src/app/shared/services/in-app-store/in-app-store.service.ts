import { Injectable } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ReceiptValidatorService } from '@shared-modules/services/in-app-store/receipt-validator.service';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import { catchError, first, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserSetForeverAccess, UserSetProModeAction } from '@shared-modules/store/user/user.actions';
import { BehaviorSubject } from 'rxjs';

const DEBUG_PRODUCT_MONTHLY: IAPProduct = {
  id: 'eee',
  billingPeriodUnit: 'Month',
  price: '$0.99',
  description: 'Get all game modes, customisations and stats',
  title: 'All Access Package',
  valid: true,
} as any;

const DEBUG_PRODUCT_FOREVER: IAPProduct = {
  id: 'ALL_ACCESS_PACKAGE_FOREVER',
  alias: 'Unlock All Features as a one time payment',
  type: 'non consumable',
  group: null,
  state: 'registered',
  title: 'All Access Package',
  description: 'Unlimited games, customisations and stats',
  priceMicros: 10990000,
  price: '8,99€',
  currency: 'EUR',
  countryCode: 'FR',
  loaded: false,
  canPurchase: false,
  owned: false,
  introPrice: null,
  introPriceMicros: null,
  introPricePeriod: null,
  introPricePeriodUnit: null,
  introPricePaymentMode: null,
  ineligibleForIntroPrice: null,
  discounts: [],
  downloading: false,
  downloaded: false,
  additionalData: null,
  transaction: null,
  billingPeriod: 0,
  billingPeriodUnit: 'Day',
} as any;

@Injectable({
  providedIn: 'root',
})
export class InAppStoreService {
  static PRODUCT_MONTHLY_KEY = 'ALL_ACCESS_PACKAGE';
  static PRODUCT_FOREVER_KEY = 'ALL_ACCESS_PACKAGE_FOREVER';
  private productMonthly$ = new BehaviorSubject<IAPProduct>(DEBUG_PRODUCT_MONTHLY);
  private productForever$ = new BehaviorSubject<IAPProduct>(DEBUG_PRODUCT_FOREVER);
  private initDone: boolean;

  loading: HTMLIonLoadingElement;

  get productMonthlyObservable$() {
    return this.productMonthly$;
  }

  get productForeverObservable$() {
    return this.productForever$;
  }

  constructor(
    private readonly store: Store,
    private readonly iap: InAppPurchase2,
    private readonly loadingController: LoadingController,
    private readonly receiptValidator: ReceiptValidatorService,
    private readonly analyticsService: AnalyticsService,
    private readonly utils: UtilsService,
  ) {
  }

  init() {
    if (this.initDone) {
      return;
    }
    if (!this.utils.isIOS && !this.utils.isAndroid) {
      console.log('iap not initialised. No app detected.');
      return;
    }
    this.registerProducts();
    this.listenSubscriptionChanges();
    this.listenToNonConsumableChanges();

    this.iap.ready(() => {
      this.initDone = true;
    });
    this.restore();
  }

  registerProducts() {
    if (!environment.production) {
      this.iap.verbosity = this.iap.DEBUG;
    }
    this.iap.register({
      id: InAppStoreService.PRODUCT_MONTHLY_KEY,
      type: this.iap.PAID_SUBSCRIPTION,
      alias: 'Unlock All Features',
    });
    this.iap.register({
      id: InAppStoreService.PRODUCT_FOREVER_KEY,
      type: this.iap.NON_CONSUMABLE,
      alias: 'Unlock All Features as a one time payment',
    });
  }

  listenSubscriptionChanges() {
    this.iap.when(InAppStoreService.PRODUCT_MONTHLY_KEY).updated(() => {
      const product = this.iap.get(InAppStoreService.PRODUCT_MONTHLY_KEY);
      this.productMonthly$.next(product);

      if (product.owned && product.valid) {
        // console.log({ product });
        console.log('GO_PRO <--------------------------');
        this.store.dispatch(new UserSetProModeAction({ pro: true }));
      } else {
        console.log('GO_FREE <--------------------------');
        this.store.dispatch(new UserSetProModeAction({ pro: false }));
      }
    });

    this.iap.when(InAppStoreService.PRODUCT_MONTHLY_KEY)
      .approved((p: IAPProduct) => {
          if (p.id === InAppStoreService.PRODUCT_MONTHLY_KEY) {
            this.iap.validator = this.verifyReceiptFn;
            p.verify();
          }
        },
      )
      .expired((p: IAPProduct) => {
        console.log('EXPIRED MONTHLY <--------------------------');
        location.reload(true);
      })
      .cancelled((p: IAPProduct) => {
        console.log('CANCELLED MONTHLY <--------------------------');
        if (this.loading) {
          this.loading.dismiss();
        }
      })
      .verified((p: IAPProduct) => {
        console.log('VERIFIED MONTHLY <--------------------------');
        return p.finish();
      });
  }

  listenToNonConsumableChanges() {
    this.iap.when(InAppStoreService.PRODUCT_FOREVER_KEY).updated(() => {
      const product = this.iap.get(InAppStoreService.PRODUCT_FOREVER_KEY);
      this.productForever$.next(product);

      if (product.owned) {
        console.log('FOREVER OWNED <--------------------------');
        this.store.dispatch(new UserSetForeverAccess({ access: product.owned }));
      }
      if (!environment.production) {
        console.log({ foreverProduct: product });
      }
    });

    this.iap.when(InAppStoreService.PRODUCT_FOREVER_KEY)
      .approved((p: IAPProduct) => {
        if (p.id === InAppStoreService.PRODUCT_FOREVER_KEY) {
          this.iap.validator = this.verifyReceiptFn;
          p.verify();
        }
      })
      .verified((p: IAPProduct) => {
        console.log('VERIFIED FOREVER <--------------------------');
        p.finish();
      });
  }

  order(p: IAPProduct) {
    this.analyticsService.logEvent('action', 'orderInit');
    this.iap.order(p).then(() => {
      // Purshase in progress
      this.loadingController.create({
        message: 'Please wait...',
        duration: 55555,
      }).then(l => {
        this.loading = l;
        this.loading.present();
      });
    }, err => {
      console.error(err);
    });
  }

  restore() {
    this.iap.refresh();
  }

  private verifyReceiptFn = (product, callback) => {
    console.log({ productToVerify: product });
    if (typeof product === 'object' && product !== null) {
      this.receiptValidator.verifyReceipt(product.transaction?.appStoreReceipt, product.id).pipe(
        first(),
        tap(valid => {
          console.log({ validReturnFromAPI: valid });
          if (this.loading) {
            this.loading.dismiss();
          }

          if (valid) {
            callback(true, { productToVerify: product });
          } else {
            console.log('PURCHASE_EXPIRED <--------------------------');
            callback(false, {
              code: this.iap.PURCHASE_EXPIRED,
              error: { message: 'PURCHASE_EXPIRED' },
            });
          }
        }),
      ).subscribe();

    } else {
      if (this.loading) {
        this.loading.dismiss();
      }
      console.log('CONNECTION_FAILED <--------------------------');
      callback(false, {
        code: this.iap.CONNECTION_FAILED,
        error: { message: 'CONNECTION_FAILED' },
      });
    }
  };
}
