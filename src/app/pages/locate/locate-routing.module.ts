import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocatePage } from './locate.page';

const routes: Routes = [
  {
    path: '',
    component: LocatePage,
    // there's no way to prevent swipe navigation in IOS
    // canDeactivate: [CanDeactivateGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocatePageRoutingModule {}
