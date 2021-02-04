import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ExploreScalesPageRoutingModule} from './explore-scales-routing.module';

import {ExploreScalesPage} from './explore-scales.page';
import {FretboardModule} from '@shared-modules/modules/fretboard/fretboard.module';
import {GlobalModule} from '@shared-modules/modules/global/global.module';
import {NgxsModule} from '@ngxs/store';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    GlobalModule,
    ExploreScalesPageRoutingModule,

    NgxsModule.forFeature(),
  ],
  declarations: [ExploreScalesPage],
  providers: [FretboardManipulationService],
})
export class ExploreScalesPageModule {
}
