import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatButtonModule, MatCheckboxModule,
  MatSelectModule, MatCardModule, MatIconModule,
  MatInputModule,
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
  ]
})
export class SharedModule { }
