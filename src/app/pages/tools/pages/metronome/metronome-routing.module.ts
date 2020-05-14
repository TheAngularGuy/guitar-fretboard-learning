import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MetronomePage } from './metronome.page';

const routes: Routes = [
  {
    path: '',
    component: MetronomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MetronomePageRoutingModule {}
