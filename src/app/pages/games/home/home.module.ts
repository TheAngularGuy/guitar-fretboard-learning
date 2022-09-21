import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListModule } from '@shared/components/list/list.module';

import { HomePageRoutingModule } from './home.routing';
import { HomePage } from './home.page';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, HomePageRoutingModule, ListModule],
  declarations: [HomePage],
})
export class HomePageModule {}
