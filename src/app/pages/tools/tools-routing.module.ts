import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToolsPage } from './tools.page';

const routes: Routes = [
  {
    path: '',
    component: ToolsPage
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
export class ToolsPageRoutingModule {}
