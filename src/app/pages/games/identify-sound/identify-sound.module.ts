import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { CanDeactivateGuard } from '@shared-modules/guards/deactivate.guard';
import { BtnModule } from '@shared-modules/modules/btn/btn.module';
import { GlobalModule } from '@shared-modules/modules/global/global.module';
import { FretboardManipulationService } from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from '@shared-modules/services/utils/utils.service';

import { IdentifySoundPageRoutingModule } from './identify-sound-routing.module';

import { IdentifySoundPage } from './identify-sound.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifySoundPageRoutingModule,
    GlobalModule,
    BtnModule,
    NgxsModule.forFeature(),
  ],
  declarations: [IdentifySoundPage],
  providers: [UtilsService, CanDeactivateGuard, FretboardManipulationService],
})
export class IdentifySoundPageModule {
}
