import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LostPageRoutingModule } from './lost-routing.module';

import { LostPage } from './lost.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LostPageRoutingModule
  ],
  declarations: [LostPage]
})
export class LostPageModule {}
