import {Injectable} from '@angular/core';
import {IAPProduct, InAppPurchase2} from '@ionic-native/in-app-purchase-2/ngx';
import {Store} from '@ngxs/store';
import {environment} from '../../../../environments/environment';
import {UserSetProModeAction} from '@shared-modules/store/user/user.actions';

@Injectable({
  providedIn: 'root'
})
export class InAppStoreService {
  static PRODUCT_KEY = 'UNLOCK_ALL_FEATURES';
  private products: IAPProduct[];
  private initDone: boolean;

  get productsList() {
    return this.products;
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
      this.products = this.iap.products;
      this.initDone = true;
      console.log({products: this.products});
    });
  }

  registerProducts() {
    if (!environment.production) {
      this.iap.verbosity = this.iap.DEBUG;
    }

    this.iap.register({
      id: InAppStoreService.PRODUCT_KEY,
      type: this.iap.PAID_SUBSCRIPTION,
    });
    this.iap.refresh();
  }

  listenProductsChanges() {
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
