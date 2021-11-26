import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileDataPageRoutingModule } from './profile-data-routing.module';

import { ProfileDataPage } from './profile-data.page';
import {GlobalModule} from '@shared-modules/modules/global/global.module';
import {NgxsModule} from '@ngxs/store';
import {HistoricChartComponent} from '@pages/profile/components/historic-chart/historic-chart.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileDataPageRoutingModule,
    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [ProfileDataPage, HistoricChartComponent]
})
export class ProfileDataPageModule {}