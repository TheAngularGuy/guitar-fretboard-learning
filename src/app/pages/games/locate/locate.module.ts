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

import { LocatePageRoutingModule } from './locate.routing';
import { LocatePage } from './locate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocatePageRoutingModule,
    FretboardModule,
    BtnModule,
    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [LocatePage],
  providers: [UtilsService, ToastController, CanDeactivateGuard, FretboardManipulationService],
})
export class LocatePageModule {
}
