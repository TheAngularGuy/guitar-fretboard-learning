import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomTuningPage } from './custom-tuning.page';

const routes: Routes = [
  {
    path: '',
    component: CustomTuningPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomTuningPageRoutingModule {
}
