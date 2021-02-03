import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreScalesPage} from '@pages/explore/pages/explore-scales/explore-scales.page';


const routes: Routes = [
  {
    path: '',
    component: ExploreScalesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreNotesPageRoutingModule {
}
