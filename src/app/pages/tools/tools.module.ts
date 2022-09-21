import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxsModule } from '@ngxs/store';
import { ToolsState } from '@pages/tools/store/tools.state';
import { ListModule } from '@shared/components/list/list.module';

import { ToolsPage } from './tools.page';

import { ToolsPageRoutingModule } from './tools.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToolsPageRoutingModule,
    ListModule,

    NgxsModule.forFeature([ToolsState]),
  ],
  declarations: [ToolsPage],
})
export class ToolsPageModule {
}
