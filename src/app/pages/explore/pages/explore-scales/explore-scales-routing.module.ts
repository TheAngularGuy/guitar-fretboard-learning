import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreScalesPage } from './explore-scales.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreScalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreScalesPageRoutingModule {}
