import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { CanDeactivateGuard } from '../../guards/deactivate.guard';
import { LocatePageRoutingModule } from './locate-routing.module';
import { LocatePage } from './locate.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LocatePageRoutingModule,
    FretboardModule,
  ],
  declarations: [LocatePage],
  providers: [UtilsService, ToastController, AlertController, CanDeactivateGuard],
})
export class LocatePageModule {}
