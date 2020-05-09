import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GlobalModule } from '../../../../shared/modules/global/global.module';

import { TunerPageRoutingModule } from './tuner-routing.module';

import { TunerPage } from './tuner.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GlobalModule,
    TunerPageRoutingModule
  ],
  declarations: [TunerPage]
})
export class TunerPageModule {}
