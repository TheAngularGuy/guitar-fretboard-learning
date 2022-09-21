import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

import { MetronomePage } from './metronome.page';

import { MetronomePageRoutingModule } from './metronome.routing';
import { TempoNamePipe } from './tempo-name.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    MetronomePageRoutingModule,

    NgxsModule.forFeature(),
  ],
  declarations: [MetronomePage, TempoNamePipe],
})
export class MetronomePageModule {
}
