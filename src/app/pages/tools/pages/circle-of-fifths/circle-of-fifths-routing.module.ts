import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CircleOfFifthsPage } from './circle-of-fifths.page';

const routes: Routes = [
  {
    path: '',
    component: CircleOfFifthsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CircleOfFifthsPageRoutingModule {}
