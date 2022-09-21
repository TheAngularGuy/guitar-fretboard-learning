import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CanDeactivateGuard } from '@core/guards/deactivate.guard';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { IonicModule, ToastController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { BtnModule } from '@shared/components/btn/btn.module';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { LocateAllPageRoutingModule } from './locate-all.routing';
import { LocateAllPage } from './locate-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocateAllPageRoutingModule,
    FretboardModule,
    BtnModule,
    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [LocateAllPage],
  providers: [UtilsService, ToastController, CanDeactivateGuard, FretboardManipulationService],
})
export class LocateAllPageModule {
}
