import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';

import { FretboardComponent } from './fretboard.component';

@NgModule({
  declarations: [FretboardComponent],
  imports: [CommonModule, NotePipeModule],
  exports: [FretboardComponent],
})
export class FretboardModule {
}
