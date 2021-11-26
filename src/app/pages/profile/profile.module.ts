import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import {GlobalModule} from '@shared-modules/modules/global/global.module';
import {AuthGuardService} from '@pages/profile/guards/loged-in.guard';
import {NgxsModule} from '@ngxs/store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    GlobalModule,


    NgxsModule.forFeature(),
  ],
  declarations: [ProfilePage],
  providers: [AuthGuardService]
})
export class ProfilePageModule {}
