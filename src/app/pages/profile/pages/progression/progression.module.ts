import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressionPageRoutingModule } from './progression-routing.module';

import { ProgressionPage } from './progression.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressionPageRoutingModule
  ],
  declarations: [ProgressionPage]
})
export class ProgressionPageModule {}
