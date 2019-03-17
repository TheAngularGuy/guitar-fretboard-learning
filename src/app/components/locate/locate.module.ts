import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { LocateComponent } from './locate.component';

const routes: Routes = [
  {
    path: '',
    component: LocateComponent
  },
];

@NgModule({
  declarations: [LocateComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class LocateModule { }
