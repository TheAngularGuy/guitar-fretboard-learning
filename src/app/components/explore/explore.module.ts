import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ExploreComponent } from './explore.component';

const routes: Routes = [
  {
    path: '',
    component: ExploreComponent
  },
];


@NgModule({
  declarations: [ExploreComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ExploreModule { }
