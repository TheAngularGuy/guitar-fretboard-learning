import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard } from '@core/guards/deactivate.guard';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from '@core/services/utils/utils.service';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { BtnModule } from '@shared/components/btn/btn.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { IdentifySoundPageRoutingModule } from './identify-sound.routing';

import { IdentifySoundPage } from './identify-sound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifySoundPageRoutingModule,
    BtnModule,
    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [IdentifySoundPage],
  providers: [UtilsService, CanDeactivateGuard, FretboardManipulationService],
})
export class IdentifySoundPageModule {
}
