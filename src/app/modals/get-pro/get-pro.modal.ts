import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { InAppStoreService } from '@shared-modules/services/in-app-store/in-app-store.service';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { delayAnimation } from '../../animations/delay.animation';
import { fadeinAnimation } from '../../animations/fadein.animation';
import { popAnimation } from '../../animations/pop.animation';

@Component({
  selector: 'app-get-pro',
  templateUrl: './get-pro.modal.html',
  styleUrls: ['./get-pro.modal.scss'],
  animations: [popAnimation, delayAnimation, fadeinAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GetProModal implements OnInit {
  choix$ = new BehaviorSubject<'monthly' | 'forever'>('forever');
  productMonthly$: Observable<IAPProduct>;
  productForever$: Observable<IAPProduct>;

  constructor(
    private readonly store: Store,
    private readonly iapService: InAppStoreService,
    private readonly modalCtrl: ModalController,
    private readonly analyticsService: AnalyticsService,
  ) {
  }

  ngOnInit() {
    this.productMonthly$ = this.iapService.productMonthlyObservable$;
    this.productForever$ = this.iapService.productForeverObservable$;
    this.analyticsService.logEvent('modal', 'order');
  }

  orderProMode(product: IAPProduct) {
    this.analyticsService.logEvent('action', 'orderPrompt');
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

}
