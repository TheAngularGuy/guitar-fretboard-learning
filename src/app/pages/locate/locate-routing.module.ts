import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../guards/deactivate.guard';
import { LocatePage } from './locate.page';

const routes: Routes = [
  {
    path: '',
    component: LocatePage,
    canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatePageRoutingModule {}
