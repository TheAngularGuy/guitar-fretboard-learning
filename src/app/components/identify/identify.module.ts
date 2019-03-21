import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { IdentifyComponent } from './identify.component';

const routes: Routes = [
  {
    path: '',
    component: IdentifyComponent
  },
];

@NgModule({
  declarations: [IdentifyComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class IdentifyModule { }
