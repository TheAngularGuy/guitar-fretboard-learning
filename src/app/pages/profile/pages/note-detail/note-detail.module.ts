import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { NoteDetailPage } from './note-detail.page';

import { NoteDetailPageRoutingModule } from './note-detail.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoteDetailPageRoutingModule,
    FretboardModule,

    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [NoteDetailPage],
  providers: [FretboardManipulationService],
})
export class NoteDetailPageModule {
}
