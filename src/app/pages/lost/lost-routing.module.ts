import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LostPage } from './lost.page';

const routes: Routes = [
  {
    path: '',
    component: LostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LostPageRoutingModule {}
