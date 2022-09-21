import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { CircleOfFifthsPage } from './circle-of-fifths.page';

import { CircleOfFifthsPageRoutingModule } from './circle-of-fifths.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CircleOfFifthsPageRoutingModule,
    NotePipeModule,
  ],
  declarations: [CircleOfFifthsPage],
})
export class CircleOfFifthsPageModule {
}
