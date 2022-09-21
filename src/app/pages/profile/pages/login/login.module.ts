import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';

import { LoginPage } from './login.page';

import { LoginPageRoutingModule } from './login.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,

    NgxsModule.forFeature(),
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {
}
