import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CanDeactivateGuard } from '../../shared/guards/deactivate.guard';
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
  ],
  declarations: [IdentifyPage],
  providers: [UtilsService, ToastController, AlertController, CanDeactivateGuard],
})
export class IdentifyPageModule {}
