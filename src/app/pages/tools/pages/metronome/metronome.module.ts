import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { GlobalModule } from '@shared-modules/modules/global/global.module';

import { MetronomePageRoutingModule } from './metronome-routing.module';

import { MetronomePage } from './metronome.page';
import {NgxsModule} from '@ngxs/store';
import { TempoNamePipe } from './tempo-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MetronomePageRoutingModule,
    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [MetronomePage, TempoNamePipe],
})
export class MetronomePageModule {
}
