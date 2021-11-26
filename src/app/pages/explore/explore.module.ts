import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {NgxsModule} from '@ngxs/store';
import {ListModule} from 'src/app/shared/modules/list/list.module';

import {ExplorePageRoutingModule} from './explore-routing.module';
import {ExplorePage} from './explore.page';

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
export class ExplorePageModule {}
