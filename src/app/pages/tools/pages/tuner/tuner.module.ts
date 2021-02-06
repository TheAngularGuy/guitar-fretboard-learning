import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GlobalModule } from '@shared-modules/modules/global/global.module';
import { ChromaticWheelComponent } from './chromatic-wheel/chromatic-wheel.component';

import { TunerPageRoutingModule } from './tuner-routing.module';

import { TunerPage } from './tuner.page';
import {BtnModule} from '@shared-modules/modules/btn/btn.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalModule,
    TunerPageRoutingModule,
    BtnModule,
  ],
  declarations: [TunerPage, ChromaticWheelComponent]
})
export class TunerPageModule {}
