import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule, ToastController} from '@ionic/angular';

import {PracticePageRoutingModule} from './practice-routing.module';

import {PracticePage} from './practice.page';
import {FretboardModule} from '@shared-modules/modules/fretboard/fretboard.module';
import {GlobalModule} from '@shared-modules/modules/global/global.module';
import {BtnModule} from '@shared-modules/modules/btn/btn.module';
import {NgxsModule} from '@ngxs/store';
import {UtilsService} from '@shared-modules/services/utils/utils.service';
import {CanDeactivateGuard} from '@shared-modules/guards/deactivate.guard';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    GlobalModule,
    BtnModule,
    NgxsModule.forFeature(),
    PracticePageRoutingModule
  ],
  declarations: [PracticePage],
  providers: [UtilsService, ToastController, CanDeactivateGuard, FretboardManipulationService],
})
export class PracticePageModule {}
