import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoteDetailPageRoutingModule } from './note-detail-routing.module';

import { NoteDetailPage } from './note-detail.page';
import {GlobalModule} from '@shared-modules/modules/global/global.module';
import {FretboardModule} from '@shared-modules/modules/fretboard/fretboard.module';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import {NgxsModule} from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteDetailPageRoutingModule,
    GlobalModule,
    FretboardModule,

    NgxsModule.forFeature(),
  ],
  declarations: [NoteDetailPage],
  providers: [FretboardManipulationService]
})
export class NoteDetailPageModule {}
