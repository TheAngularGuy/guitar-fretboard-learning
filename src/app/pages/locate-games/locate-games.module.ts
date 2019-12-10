import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocateGamesPageRoutingModule } from './locate-games-routing.module';

import { LocateGamesPage } from './locate-games.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocateGamesPageRoutingModule
  ],
  declarations: [LocateGamesPage]
})
export class LocateGamesPageModule {}
