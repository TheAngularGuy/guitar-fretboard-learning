import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { GlobalModule } from 'src/app/shared/modules/global/global.module';
import { FretboardManipulationService } from 'src/app/shared/services/fretboard-manipulation/fretboard-manipulation.service';

import { ExploreNotesPageRoutingModule } from './explore-routing.module';
import { ExploreNotesPage } from './explore-notes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExploreNotesPageRoutingModule,
    FretboardModule,
    GlobalModule,

    NgxsModule.forFeature(),
  ],
  declarations: [ExploreNotesPage],
  providers: [FretboardManipulationService],
})
export class ExploreNotesPageModule {}
