import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ListModule } from 'src/app/shared/modules/list/list.module';

import { IdentifyGamesPageRoutingModule } from './identify-games-routing.module';
import { IdentifyGamesPage } from './identify-games.page';
import { IdentifyState } from './store/identify.state';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IdentifyGamesPageRoutingModule,
    ListModule,

    NgxsModule.forFeature([IdentifyState]),
  ],
  declarations: [IdentifyGamesPage],
})
export class IdentifyGamesPageModule {}
