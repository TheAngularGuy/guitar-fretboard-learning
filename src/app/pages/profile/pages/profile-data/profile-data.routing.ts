import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileDataPage } from './profile-data.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileDataPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileDataPageRoutingModule {
}
