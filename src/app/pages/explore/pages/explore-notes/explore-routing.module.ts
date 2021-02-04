import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExploreNotesPage} from '@pages/explore/pages/explore-notes/explore-notes.page';


const routes: Routes = [
  {
    path: '',
    component: ExploreNotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExploreNotesPageRoutingModule {
}
