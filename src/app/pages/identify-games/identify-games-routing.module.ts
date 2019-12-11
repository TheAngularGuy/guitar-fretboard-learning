import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IdentifyGamesPage } from './identify-games.page';

const routes: Routes = [
  {
    path: '',
    component: IdentifyGamesPage,
  },
  {
    path: 'identify',
    loadChildren: () => import('./pages/identify/identify.module').then(m => m.IdentifyPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IdentifyGamesPageRoutingModule {}
