import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ListModule } from 'src/app/shared/modules/list/list.module';

import { ExploreGamesPageRoutingModule } from './explore-games-routing.module';
import { ExploreGamesPage } from './explore-games.page';
import { ExploreState } from './store/explore.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreGamesPageRoutingModule,
    ListModule,

    NgxsModule.forFeature([ExploreState]),
  ],
  declarations: [ExploreGamesPage],
})
export class ExploreGamesPageModule {}
