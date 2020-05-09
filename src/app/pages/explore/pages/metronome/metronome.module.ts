import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GlobalModule } from '../../../../shared/modules/global/global.module';

import { MetronomePageRoutingModule } from './metronome-routing.module';

import { MetronomePage } from './metronome.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MetronomePageRoutingModule,
    GlobalModule,
  ],
  declarations: [MetronomePage],
})
export class MetronomePageModule {
}
