import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { CustomTuningPage } from './custom-tuning.page';

import { CustomTuningPageRoutingModule } from './custom-tuning.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomTuningPageRoutingModule,
    NotePipeModule,
  ],
  declarations: [CustomTuningPage],
})
export class CustomTuningPageModule {
}
