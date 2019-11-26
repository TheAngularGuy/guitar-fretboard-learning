import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LostComponent } from './components/lost/lost.component';

const routes: Routes = [
  {
    path: 'locate',
    loadChildren: './modules/locate/locate.module#LocateModule',
  },
  {
    path: 'explore',
    loadChildren: './modules/explore/explore.module#ExploreModule',
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: '404',
    component: LostComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
