import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

import { CHROMATIC_SCALE } from '../../../../constants/chromatic-scale.constant';

@Component({
  selector: 'app-custom-tuning-modal',
  templateUrl: './custom-tuning-modal.component.html',
  styleUrls: ['./custom-tuning-modal.component.scss'],
})
export class CustomTuningModalComponent implements OnInit {
  chromaticScale = CHROMATIC_SCALE;
  customTuning = ['E', 'A', 'D', 'G', 'B', 'E'];

  constructor(private readonly modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss(save = false) {
    this.modalCtrl.dismiss({
      save,
      customTuning: this.customTuning.join('-'),
    });
  }
}
