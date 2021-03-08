import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermsOfUsePageRoutingModule } from './terms-of-use-routing.module';

import { TermsOfUsePage } from './terms-of-use.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermsOfUsePageRoutingModule
  ],
  declarations: [TermsOfUsePage]
})
export class TermsOfUsePageModule {}
