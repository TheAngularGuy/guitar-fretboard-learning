import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChordCircleOfFifthsPage } from './chord-circle-of-fifths.page';

const routes: Routes = [
  {
    path: '',
    component: ChordCircleOfFifthsPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChordCircleOfFifthsPageRoutingModule {
}
