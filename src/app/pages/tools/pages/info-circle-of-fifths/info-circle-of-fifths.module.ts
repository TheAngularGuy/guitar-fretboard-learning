import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCircleOfFifthsPageRoutingModule } from './info-circle-of-fifths-routing.module';

import { InfoCircleOfFifthsPage } from './info-circle-of-fifths.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoCircleOfFifthsPageRoutingModule
  ],
  declarations: [InfoCircleOfFifthsPage]
})
export class InfoCircleOfFifthsPageModule {}
