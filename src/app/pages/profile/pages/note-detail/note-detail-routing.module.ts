import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteDetailPage } from './note-detail.page';

const routes: Routes = [
  {
    path: '',
    component: NoteDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoteDetailPageRoutingModule {}
