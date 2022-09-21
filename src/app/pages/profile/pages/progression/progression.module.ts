import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProgressionPage } from './progression.page';

import { ProgressionPageRoutingModule } from './progression.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProgressionPageRoutingModule,
  ],
  declarations: [ProgressionPage],
})
export class ProgressionPageModule {
}
