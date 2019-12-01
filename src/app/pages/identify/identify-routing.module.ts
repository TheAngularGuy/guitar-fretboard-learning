import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentifyPage } from './identify.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifyPageRoutingModule {}
