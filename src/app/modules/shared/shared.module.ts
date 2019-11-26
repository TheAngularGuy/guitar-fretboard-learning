import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatSelectModule,
  MatSnackBarModule,
  MatTabsModule,
  MatToolbarModule,
} from '@angular/material';

import { FretboardComponent } from './fretboard/fretboard.component';

@NgModule({
  declarations: [
    FretboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // material modules
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
  ],
  exports: [
    FretboardComponent,
    ReactiveFormsModule,

    // material modules
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatTabsModule,
  ]
})
export class SharedModule { }
