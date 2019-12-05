import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { FretboardModule } from 'src/app/shared/modules/fretboard/fretboard.module';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

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

    NgxsModule.forFeature(),
  ],
  declarations: [ExplorePage],
  providers: [UtilsService],
})
export class ExplorePageModule {}
