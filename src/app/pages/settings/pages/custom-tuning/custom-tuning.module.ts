import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GlobalModule } from '../../../../shared/modules/global/global.module';

import { CustomTuningPageRoutingModule } from './custom-tuning-routing.module';

import { CustomTuningPage } from './custom-tuning.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomTuningPageRoutingModule,
    GlobalModule,
  ],
  declarations: [CustomTuningPage],
})
export class CustomTuningPageModule {
}
