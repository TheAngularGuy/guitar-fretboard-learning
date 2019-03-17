import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { FretboardComponent } from './fretboard/fretboard.component';

@NgModule({
  declarations: [FretboardComponent],
  imports: [
    CommonModule,


    // material modules
    MatToolbarModule,
    MatButtonModule,
  ],
  exports: [
    FretboardComponent,

    // material modules
    MatToolbarModule,
    MatButtonModule,
  ]
})
export class SharedModule { }
