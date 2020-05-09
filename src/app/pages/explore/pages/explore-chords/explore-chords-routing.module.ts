import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExploreChordsPage } from './explore-chords.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreChordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreChordsPageRoutingModule {}
