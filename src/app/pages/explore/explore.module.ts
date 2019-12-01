import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UtilsService } from 'src/app/services/utils/utils.service';
import { FretboardModule } from 'src/app/shared/fretboard/fretboard.module';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { ExplorePage } from './explore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    FretboardModule,
  ],
  declarations: [ExplorePage],
  providers: [UtilsService],
})
export class ExplorePageModule {}
