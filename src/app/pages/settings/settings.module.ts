import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { SettingsPageRoutingModule } from './settings-routing.module';
import { SettingsPage } from './settings.page';
import { SettingsState } from './store/settings.state';
import {GlobalModule} from '@shared-modules/modules/global/global.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    GlobalModule,

    NgxsModule.forFeature([SettingsState]),
  ],
  declarations: [SettingsPage],
  providers: [ModalController],
})
export class SettingsPageModule {
}
