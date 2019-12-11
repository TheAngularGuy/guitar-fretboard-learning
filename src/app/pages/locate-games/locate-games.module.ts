import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ListModule } from 'src/app/shared/modules/list/list.module';

import { LocateGamesPageRoutingModule } from './locate-games-routing.module';
import { LocateGamesPage } from './locate-games.page';
import { LocateState } from './store/locate.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocateGamesPageRoutingModule,
    ListModule,

    NgxsModule.forFeature([LocateState]),
  ],
  declarations: [LocateGamesPage],
})
export class LocateGamesPageModule {}
