import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import {
  FretboardManipulationService,
} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { ExplorePage } from './explore.page';
import { ExploreState } from './store/explore.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    FretboardModule,

    NgxsModule.forFeature([ExploreState]),
  ],
  declarations: [ExplorePage],
  providers: [FretboardManipulationService],
})
export class ExplorePageModule {}
