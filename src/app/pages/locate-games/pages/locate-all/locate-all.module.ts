import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocateAllPageRoutingModule } from './locate-all-routing.module';

import { LocateAllPage } from './locate-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocateAllPageRoutingModule
  ],
  declarations: [LocateAllPage]
})
export class LocateAllPageModule {}
