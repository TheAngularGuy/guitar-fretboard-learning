import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from '@shared-modules/modules/fretboard/fretboard.module';
import { GlobalModule } from '@shared-modules/modules/global/global.module';

import { ChordCircleOfFifthsPageRoutingModule } from './chord-circle-of-fifths-routing.module';

import { ChordCircleOfFifthsPage } from './chord-circle-of-fifths.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FretboardModule,
    GlobalModule,
    ChordCircleOfFifthsPageRoutingModule,

    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [ChordCircleOfFifthsPage],
})
export class ChordCircleOfFifthsPageModule {
}
