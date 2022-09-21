import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';
import { ExploreChordsPage } from './explore-chords.page';

import { ExploreChordsPageRoutingModule } from './explore-chords.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    ExploreChordsPageRoutingModule,

    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [ExploreChordsPage],
  providers: [],
})
export class ExploreChordsPageModule {
}
