import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotePipe } from './pipes/note.pipe';
import { LonpPressDirective } from './directives/lonp-press.directive';

@NgModule({
  declarations: [NotePipe, LonpPressDirective],
  imports: [CommonModule],
  exports: [NotePipe, LonpPressDirective],
})
export class GlobalModule {}
