import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { ExploreScalesPage } from './explore-scales.page';

import { ExploreScalesPageRoutingModule } from './explore-scales.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    ExploreScalesPageRoutingModule,

    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [ExploreScalesPage],
  providers: [FretboardManipulationService],
})
export class ExploreScalesPageModule {
}
