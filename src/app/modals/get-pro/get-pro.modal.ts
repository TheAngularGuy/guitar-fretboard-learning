import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {popAnimation} from '../../animations/pop.animation';
import {delayAnimation} from '../../animations/delay.animation';
import {InAppStoreService} from '@shared-modules/services/in-app-store/in-app-store.service';
import {Store} from '@ngxs/store';
import {IAPProduct} from '@ionic-native/in-app-purchase-2/ngx';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-get-pro',
  templateUrl: './get-pro.modal.html',
  styleUrls: ['./get-pro.modal.scss'],
  animations: [popAnimation, delayAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetProModal implements OnInit {
  products: IAPProduct[];

  constructor(
    private store: Store,
    private iapService: InAppStoreService,
    private modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
    this.products = this.iapService.productsList;
  }

  orderProMode(product: IAPProduct) {
    this.iapService.order(product);
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
