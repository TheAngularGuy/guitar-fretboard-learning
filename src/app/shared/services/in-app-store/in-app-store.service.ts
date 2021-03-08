import { Injectable } from '@angular/core';
import { IAPProduct, InAppPurchase2 } from '@ionic-native/in-app-purchase-2/ngx';
import { LoadingController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { ReceiptValidatorService } from '@shared-modules/services/in-app-store/receipt-validator.service';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import { catchError, first, tap } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { UserSetProModeAction } from '@shared-modules/store/user/user.actions';
import { BehaviorSubject } from 'rxjs';

const DEBUG_PRODUCT: IAPProduct = {
  id: 'eee',
  billingPeriodUnit: 'Month',
  price: '$0.99',
  description: 'Get all game modes, customisations and stats',
  title: 'All Access Package',
  valid: true,
} as any;

@Injectable({
  providedIn: 'root',
})
export class InAppStoreService {
  static PRODUCT_KEY = 'ALL_ACCESS_PACKAGE';
  private product$ = new BehaviorSubject<IAPProduct>(DEBUG_PRODUCT);
  private initDone: boolean;

  loading: HTMLIonLoadingElement;

  get productObservable$() {
    return this.product$;
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
    this.listenProductsChanges();

    this.iap.ready(() => {
      this.initDone = true;
    });
    this.restore();
  }

  registerProducts() {
    if (!environment.production) {
      // this.iap.verbosity = this.iap.DEBUG;
    }

    this.iap.register({
      id: InAppStoreService.PRODUCT_KEY,
      type: this.iap.PAID_SUBSCRIPTION,
      alias: 'Unluck All Features ',
    });
  }

  listenProductsChanges() {
    this.iap.when(InAppStoreService.PRODUCT_KEY).updated(() => {
      const product = this.iap.get(InAppStoreService.PRODUCT_KEY);
      this.product$.next(product);

      if (product.owned && product.valid) {
        // console.log({ product });
        console.log('GO_PRO <--------------------------');
        this.store.dispatch(new UserSetProModeAction({ pro: true }));
      } else {
        console.log('GO_FREE <--------------------------');
        this.store.dispatch(new UserSetProModeAction({ pro: false }));
      }
    });

    this.iap.when(InAppStoreService.PRODUCT_KEY)
      .approved((p: IAPProduct) => {
          if (p.id === InAppStoreService.PRODUCT_KEY) {

            this.iap.validator = (product, callback) => {
              console.log({ productToVerify: product });

              if (typeof product === 'object' && product !== null) {
                this.receiptValidator.verifyReceipt(product.transaction?.appStoreReceipt, product.id).pipe(
                  first(),
                  tap(valid => {
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

            p.verify();
          }
        },
      )
      .expired((p: IAPProduct) => {
        console.log('EXPIRED <--------------------------');
        location.reload(true);
      })
      .cancelled((p: IAPProduct) => {
        console.log('CANCELLED <--------------------------');
        if (this.loading) {
          this.loading.dismiss();
        }
      })
      .verified((p: IAPProduct) => {
        console.log('VERIFIED <--------------------------');
        return p.finish();
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
}
