import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotePipe } from './pipes/note/note.pipe';

@NgModule({
  declarations: [NotePipe],
  imports: [CommonModule],
  exports: [NotePipe],
})
export class GlobalModule {}
