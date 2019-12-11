import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocateGamesPage } from './locate-games.page';

const routes: Routes = [
  {
    path: '',
    component: LocateGamesPage,
  },
  {
    path: 'locate-all',
    loadChildren: () => import('./pages/locate-all/locate-all.module').then(m => m.LocateAllPageModule),
  },
  {
    path: 'locate',
    loadChildren: () => import('./pages/locate/locate.module').then(m => m.LocatePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocateGamesPageRoutingModule {}
