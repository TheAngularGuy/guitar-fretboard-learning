import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FretboardComponent } from './fretboard.component';
import { NotePipe } from './pipes/note/note.pipe';

@NgModule({
  declarations: [FretboardComponent, NotePipe],
  imports: [CommonModule],
  exports: [FretboardComponent, NotePipe],
})
export class FretboardModule {}
