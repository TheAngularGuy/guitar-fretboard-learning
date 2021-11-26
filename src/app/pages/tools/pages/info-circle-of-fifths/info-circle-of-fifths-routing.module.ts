import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoCircleOfFifthsPage } from './info-circle-of-fifths.page';

const routes: Routes = [
  {
    path: '',
    component: InfoCircleOfFifthsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoCircleOfFifthsPageRoutingModule {}
