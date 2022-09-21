import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ListModule } from '@shared/components/list/list.module';
import { ExplorePage } from './explore.page';

import { ExplorePageRoutingModule } from './explore.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExplorePageRoutingModule,
    ListModule,

    NgxsModule.forFeature([]),
  ],
  declarations: [ExplorePage],
})
export class ExplorePageModule {
}
