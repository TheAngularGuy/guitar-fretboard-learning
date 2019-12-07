import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import {
  FretboardManipulationService,
} from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CanDeactivateGuard } from '../../shared/guards/deactivate.guard';
import { LocatePageRoutingModule } from './locate-routing.module';
import { LocatePage } from './locate.page';
import { LocateState } from './store/locate.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocatePageRoutingModule,
    FretboardModule,

    NgxsModule.forFeature([LocateState]),
  ],
  declarations: [LocatePage],
  providers: [
    UtilsService,
    ToastController,
    AlertController,
    CanDeactivateGuard,
    FretboardManipulationService,
  ],
})
export class LocatePageModule {}
