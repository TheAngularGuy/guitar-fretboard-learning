import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ToolsPage } from './tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPage,
  },
  {
    path: 'metronome',
    loadChildren: () =>
      import('./pages/metronome/metronome.module').then(m => m.MetronomePageModule),
  },
  {
    path: 'tuner',
    loadChildren: () => import('./pages/tuner/tuner.module').then(m => m.TunerPageModule),
  },
  {
    path: 'circle-of-fifths',
    loadChildren: () => import('./pages/circle-of-fifths/circle-of-fifths.module').then(m => m.CircleOfFifthsPageModule),
  },
  {
    path: 'info-circle-of-fifths',
    loadChildren: () => import('./pages/info-circle-of-fifths/info-circle-of-fifths.module').then(m => m.InfoCircleOfFifthsPageModule),
  },
  {
    path: 'chord-circle-of-fifths',
    loadChildren: () => import('./pages/chord-circle-of-fifths/chord-circle-of-fifths.module').then(m => m.ChordCircleOfFifthsPageModule),
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToolsPageRoutingModule {
}
