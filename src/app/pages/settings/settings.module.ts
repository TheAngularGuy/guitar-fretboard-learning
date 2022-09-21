import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { TuningPipeModule } from '@shared/pipes/tuning-pipe/tuning-pipe.module';
import { SettingsPage } from './settings.page';
import { SettingsPageRoutingModule } from './settings.routing';
import { SettingsState } from './store/settings.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SettingsPageRoutingModule,

    NgxsModule.forFeature([SettingsState]),
    TuningPipeModule,
  ],
  declarations: [SettingsPage],
  providers: [ModalController],
})
export class SettingsPageModule {
}
