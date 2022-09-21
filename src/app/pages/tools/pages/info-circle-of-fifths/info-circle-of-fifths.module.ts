import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCircleOfFifthsPage } from './info-circle-of-fifths.page';

import { InfoCircleOfFifthsPageRoutingModule } from './info-circle-of-fifths.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoCircleOfFifthsPageRoutingModule,
  ],
  declarations: [InfoCircleOfFifthsPage],
})
export class InfoCircleOfFifthsPageModule {
}
