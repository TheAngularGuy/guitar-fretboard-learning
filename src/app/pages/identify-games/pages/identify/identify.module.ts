import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { GlobalModule } from 'src/app/shared/modules/global/global.module';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CanDeactivateGuard } from '../../../../shared/guards/deactivate.guard';
import { IdentifyPageRoutingModule } from './identify-routing.module';
import { IdentifyPage } from './identify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    IdentifyPageRoutingModule,
    FretboardModule,
    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [IdentifyPage],
  providers: [UtilsService, ToastController, CanDeactivateGuard, FretboardManipulationService],
})
export class IdentifyPageModule {}
