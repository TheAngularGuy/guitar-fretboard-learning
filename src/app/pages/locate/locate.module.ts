import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FretboardModule } from 'src/app/shared/fretboard/fretboard.module';

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
  providers: [UtilsService, ToastController],
})
export class LocatePageModule {}
