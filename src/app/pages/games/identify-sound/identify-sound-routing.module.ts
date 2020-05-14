import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IdentifySoundPage } from './identify-sound.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifySoundPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifySoundPageRoutingModule {}
