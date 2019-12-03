import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FretboardModule } from 'src/app/shared/fretboard/fretboard.module';

import { CanDeactivateGuard } from '../../guards/deactivate.guard';
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
