import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

import {
  CustomTuningModalModule,
} from './modals/custom-tuning-modal/custom-tuning-modal.module';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SettingsState } from './store/settings.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,

    CustomTuningModalModule,

    NgxsModule.forFeature([SettingsState]),
  ],
  declarations: [SettingsPage],
  providers: [ModalController],
})
export class SettingsPageModule {}
