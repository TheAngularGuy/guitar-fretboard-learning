import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
      }, {
        path: 'locate',
        loadChildren: () => import('./locate/locate.module').then(m => m.LocatePageModule),
      }, {
        path: 'locate-all',
        loadChildren: () => import('./locate-all/locate-all.module').then(m => m.LocateAllPageModule),
      }, {
        path: 'identify',
        loadChildren: () => import('./identify/identify.module').then(m => m.IdentifyPageModule),
      }, {
        path: 'identify-sound',
        loadChildren: () => import('./identify-sound/identify-sound.module').then(m => m.IdentifySoundPageModule),
      }, {
        path: 'practice', loadChildren: () => import('./practice/practice.module').then(m => m.PracticePageModule),
      },
    ]),
  ],
})
export class GamesModule {
}
