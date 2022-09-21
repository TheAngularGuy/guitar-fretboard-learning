import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { AuthGuardService } from '@pages/profile/guards/loged-in.guard';

import { ProfilePage } from './profile.page';

import { ProfilePageRoutingModule } from './profile.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule,

    NgxsModule.forFeature(),
  ],
  declarations: [ProfilePage],
  providers: [AuthGuardService],
})
export class ProfilePageModule {
}
