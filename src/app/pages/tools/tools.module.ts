import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ListModule } from '@shared-modules/modules/list/list.module';

import { ToolsPageRoutingModule } from './tools-routing.module';

import { ToolsPage } from './tools.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsPageRoutingModule,
    ListModule,
  ],
  declarations: [ToolsPage],
})
export class ToolsPageModule {
}
