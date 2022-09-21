import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { HistoricChartComponent } from '@pages/profile/components/historic-chart/historic-chart.component';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { ProfileDataPage } from './profile-data.page';

import { ProfileDataPageRoutingModule } from './profile-data.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDataPageRoutingModule,

    NgxsModule.forFeature(),
    NotePipeModule,
  ],
  declarations: [ProfileDataPage, HistoricChartComponent],
})
export class ProfileDataPageModule {
}
