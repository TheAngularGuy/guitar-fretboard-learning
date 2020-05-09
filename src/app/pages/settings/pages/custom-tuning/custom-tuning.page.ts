import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { tap } from 'rxjs/operators';

import { CHROMATIC_SCALE } from '../../../../constants/chromatic-scale.constant';
import { SettingsAddCustomTuningAction } from '../../store/settings.actions';

@Component({
  selector: 'app-custom-tuning',
  templateUrl: './custom-tuning.page.html',
  styleUrls: ['./custom-tuning.page.scss'],
})
export class CustomTuningPage implements OnInit {
  chromaticScale = CHROMATIC_SCALE;
  customTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

  constructor(private store: Store, private navCtrl: NavController) {}

  ngOnInit() {}

  save() {
    const customTuning = this.customTuning.join('-');
    this.store.dispatch(
      new SettingsAddCustomTuningAction({
        customTuning,
      }),
    )
      .pipe(
        tap(() => {
          this.navCtrl.back();
        }),
      )
      .subscribe();
  }
}
