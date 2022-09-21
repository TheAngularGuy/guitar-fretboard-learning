import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { BtnModule } from '@shared/components/btn/btn.module';
import { ChromaticWheelComponent } from './chromatic-wheel/chromatic-wheel.component';

import { TunerPage } from './tuner.page';

import { TunerPageRoutingModule } from './tuner.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TunerPageRoutingModule,
    BtnModule,
  ],
  declarations: [TunerPage, ChromaticWheelComponent],
})
export class TunerPageModule {
}
