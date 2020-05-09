import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TunerPage } from './tuner.page';

const routes: Routes = [
  {
    path: '',
    component: TunerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TunerPageRoutingModule {}
