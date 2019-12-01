import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocatePage } from './locate.page';

const routes: Routes = [
  {
    path: '',
    component: LocatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatePageRoutingModule {}
