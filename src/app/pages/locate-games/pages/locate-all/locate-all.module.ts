import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { CanDeactivateGuard } from 'src/app/shared/guards/deactivate.guard';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { GlobalModule } from 'src/app/shared/modules/global/global.module';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { LocateAllPageRoutingModule } from './locate-all-routing.module';
import { LocateAllPage } from './locate-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocateAllPageRoutingModule,
    FretboardModule,
    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [LocateAllPage],
  providers: [UtilsService, ToastController, CanDeactivateGuard, FretboardManipulationService],
})
export class LocateAllPageModule {}
