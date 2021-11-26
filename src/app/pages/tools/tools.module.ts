import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';
import {ListModule} from '@shared-modules/modules/list/list.module';

import {ToolsPageRoutingModule} from './tools-routing.module';

import {ToolsPage} from './tools.page';
import {NgxsModule} from '@ngxs/store';
import {ToolsState} from '@pages/tools/store/tools.state';

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
