import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatButtonModule, MatCheckboxModule,
  MatSelectModule, MatCardModule, MatIconModule,
  MatInputModule, MatSnackBarModule,
} from '@angular/material';
import { FretboardComponent } from './fretboard/fretboard.component';
import { ReactiveFormsModule } from '@angular/forms';

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
  ]
})
export class SharedModule { }
