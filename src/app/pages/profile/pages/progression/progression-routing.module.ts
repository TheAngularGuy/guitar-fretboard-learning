import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProgressionPage } from './progression.page';

const routes: Routes = [
  {
    path: '',
    component: ProgressionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProgressionPageRoutingModule {}
