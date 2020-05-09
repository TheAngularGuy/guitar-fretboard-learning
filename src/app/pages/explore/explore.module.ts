import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ListModule } from 'src/app/shared/modules/list/list.module';

import { ExplorePageRoutingModule } from './explore-routing.module';
import { ExplorePage } from './explore.page';
import { ExploreState } from './store/explore.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    ListModule,

    NgxsModule.forFeature([ExploreState]),
  ],
  declarations: [ExplorePage],
})
export class ExplorePageModule {}
