import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotePipe } from '@shared/pipes/note-pipe/note.pipe';

@NgModule({
  declarations: [NotePipe],
  exports: [NotePipe],
  imports: [CommonModule],
})
export class NotePipeModule {
}
