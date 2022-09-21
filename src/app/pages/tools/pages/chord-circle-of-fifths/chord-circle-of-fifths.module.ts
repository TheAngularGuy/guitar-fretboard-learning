import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { ChordCircleOfFifthsPage } from './chord-circle-of-fifths.page';

import { ChordCircleOfFifthsPageRoutingModule } from './chord-circle-of-fifths.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    ChordCircleOfFifthsPageRoutingModule,

    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [ChordCircleOfFifthsPage],
})
export class ChordCircleOfFifthsPageModule {
}
