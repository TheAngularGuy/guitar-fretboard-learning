import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExploreGamesPage } from './explore-games.page';

const routes: Routes = [
  {
    path: '',
    component: ExploreGamesPage,
  },

  {
    path: 'explore',
    loadChildren: () => import('./pages/explore/explore.module').then(m => m.ExplorePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreGamesPageRoutingModule {}
