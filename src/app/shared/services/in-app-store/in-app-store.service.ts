import {Injectable} from '@angular/core';
import {IAPProduct, InAppPurchase2} from '@ionic-native/in-app-purchase-2/ngx';
import {Store} from '@ngxs/store';
import {environment} from '../../../../environments/environment';
import {UserSetProModeAction} from '@shared-modules/store/user/user.actions';
import {BehaviorSubject} from 'rxjs';

const DEBUG_PRODUCT: IAPProduct = {
  id: 'eee',
  billingPeriodUnit: 'Month',
  price: '$0.99',
  description: 'Get all game modes, customisations and stats',
  title: 'All Access Package',
  valid: true,
} as any;

@Injectable({
  providedIn: 'root'
})
export class InAppStoreService {
  static PRODUCT_KEY = 'UNLOCK_ALL_FEATURES';
  private product$ = new BehaviorSubject<IAPProduct>(null);
  private initDone: boolean;

  get productObservable$() {
    return this.product$;
  }

  constructor(
    private readonly store: Store,
    private readonly iap: InAppPurchase2,
  ) {
  }

  init() {
    if (this.initDone) {
      return;
    }
    this.registerProducts();
    this.listenProductsChanges();

    this.iap.ready(() => {
      this.initDone = true;
    });
    this.iap.refresh();
  }

  registerProducts() {
    if (!environment.production) {
      this.iap.verbosity = this.iap.DEBUG;
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
      console.log({product});
      this.product$.next(product);
    });

    this.iap.when('product')
      .approved((p: IAPProduct) => {
        if (p.id === InAppStoreService.PRODUCT_KEY) {
          console.log('go pro <--------------------------');
        }
        return p.verify();
      })
      .verified((p: IAPProduct) => {
        return p.finish();
      });

    this.iap.when(InAppStoreService.PRODUCT_KEY).owned((p: IAPProduct) => {
      console.log('pro owned <--------------------------');
      this.store.dispatch(new UserSetProModeAction({pro: true}));
    });
  }

  order(p: IAPProduct) {
    this.iap.order(p).then(() => {
      // Purshase in progress
    }, err => {
      console.error(err);
    });
  }

  restore() {
    this.iap.refresh();
  }
}
