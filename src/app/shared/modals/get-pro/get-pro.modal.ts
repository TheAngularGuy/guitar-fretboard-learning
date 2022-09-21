import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { delayAnimation } from '@animations/delay.animation';
import { fadeinAnimation } from '@animations/fadein.animation';
import { popAnimation } from '@animations/pop.animation';
import { IAPProduct } from '@awesome-cordova-plugins/in-app-purchase-2/ngx';
import { InAppStoreService } from '@core/services/in-app-store/in-app-store.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-get-pro',
  templateUrl: './get-pro.modal.html',
  styleUrls: ['./get-pro.modal.scss'],
  animations: [popAnimation, delayAnimation, fadeinAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
  ],
})
export class GetProModal implements OnInit {
  choix$ = new BehaviorSubject<'monthly' | 'forever'>('forever');
  productMonthly$: Observable<IAPProduct>;
  productForever$: Observable<IAPProduct>;

  constructor(
    private readonly store: Store,
    private readonly iapService: InAppStoreService,
    private readonly modalCtrl: ModalController,
    private readonly utils: UtilsService,
  ) {
  }

  get isIOS() {
    return this.utils.isIOS;
  }

  ngOnInit() {
    this.productMonthly$ = this.iapService.productMonthlyObservable$;
    this.productForever$ = this.iapService.productForeverObservable$;
  }

  orderProMode(product: IAPProduct) {
    this.iapService.order(product);
  }

  restore() {
    setTimeout(() => {
      this.close();
    }, 1000);
    this.iapService.restore();
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onChoiceChange(detail) {
    this.choix$.next(detail.value);
  }
}
