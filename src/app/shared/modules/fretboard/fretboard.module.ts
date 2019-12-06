import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FretboardComponent } from './fretboard.component';

@NgModule({
  declarations: [FretboardComponent],
  imports: [CommonModule],
  exports: [FretboardComponent],
})
export class FretboardModule {}
