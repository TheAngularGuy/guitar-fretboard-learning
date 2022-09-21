import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsOfUsePage } from './terms-of-use.page';

import { TermsOfUsePageRoutingModule } from './terms-of-use.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsOfUsePageRoutingModule,
  ],
  declarations: [TermsOfUsePage],
})
export class TermsOfUsePageModule {
}
