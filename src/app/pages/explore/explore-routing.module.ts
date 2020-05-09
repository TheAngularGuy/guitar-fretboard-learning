import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExplorePage } from './explore.page';

const routes: Routes = [
  {
    path: '',
    component: ExplorePage,
  },
  {
    path: 'explore',
    loadChildren: () =>
      import('./pages/explore-notes/explore-notes.module').then(m => m.ExploreNotesPageModule),
  },
  {
    path: 'explore-notes-chords',
    loadChildren: () =>
      import('./pages/explore-chords/explore-chords.module').then(m => m.ExploreChordsPageModule),
  },
  {
    path: 'metronome',
    loadChildren: () =>
      import('./pages/metronome/metronome.module').then(m => m.MetronomePageModule),
  },
  {
    path: 'tuner',
    loadChildren: () => import('./pages/tuner/tuner.module').then( m => m.TunerPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplorePageRoutingModule {
}
