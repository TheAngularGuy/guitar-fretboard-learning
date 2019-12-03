import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'src/app/guards/deactivate.guard';

import { IdentifyPage } from './identify.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifyPage,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifyPageRoutingModule {}
