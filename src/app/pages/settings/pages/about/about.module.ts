import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPage } from './about.page';

import { AboutPageRoutingModule } from './about.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
  ],
  declarations: [AboutPage],
})
export class AboutPageModule {
}
