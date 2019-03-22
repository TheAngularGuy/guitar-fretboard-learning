import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LostComponent } from './components/lost/lost.component';

const routes: Routes = [
  {
    path: 'locate',
    loadChildren: './components/locate/locate.module#LocateModule'
  }, {
    path: 'identify',
    loadChildren: './components/identify/identify.module#IdentifyModule'
  }, {
    path: 'explore',
    loadChildren: './components/explore/explore.module#ExploreModule'
  }, {
    path: '',
    component: HomeComponent
  }, {
    path: '404',
    component: LostComponent
  }, {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
