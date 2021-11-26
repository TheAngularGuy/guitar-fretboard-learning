import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomTuningPage } from './custom-tuning.page';

const routes: Routes = [
  {
    path: '',
    component: CustomTuningPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomTuningPageRoutingModule {}
