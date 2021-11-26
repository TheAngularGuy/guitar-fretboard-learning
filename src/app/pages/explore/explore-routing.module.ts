import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
  },
  {
    path: 'explore-notes',
    loadChildren: () =>
      import('./pages/explore-notes/explore-notes.module').then(m => m.ExploreNotesPageModule),
  },
  {
    path: 'explore-chords',
    loadChildren: () =>
      import('./pages/explore-chords/explore-chords.module').then(m => m.ExploreChordsPageModule),
  },
  {
    path: 'explore-scales',
    loadChildren: () => import('./pages/explore-scales/explore-scales.module').then( m => m.ExploreScalesPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {
}
