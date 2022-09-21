import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivacyPage } from './privacy.page';

import { PrivacyPageRoutingModule } from './privacy.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivacyPageRoutingModule,
  ],
  declarations: [PrivacyPage],
})
export class PrivacyPageModule {
}
