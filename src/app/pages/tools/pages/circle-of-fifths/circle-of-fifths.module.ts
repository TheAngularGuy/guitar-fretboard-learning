import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CircleOfFifthsPageRoutingModule } from './circle-of-fifths-routing.module';

import { CircleOfFifthsPage } from './circle-of-fifths.page';
import {GlobalModule} from '@shared-modules/modules/global/global.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircleOfFifthsPageRoutingModule,
    GlobalModule
  ],
  declarations: [CircleOfFifthsPage]
})
export class CircleOfFifthsPageModule {}
