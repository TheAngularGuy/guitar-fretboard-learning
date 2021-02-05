import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotePipe } from './pipes/note.pipe';
import { LonpPressDirective } from './directives/lonp-press.directive';
import {TuningPipe} from '@shared-modules/modules/global/pipes/tuning.pipe';

@NgModule({
  declarations: [NotePipe, TuningPipe, LonpPressDirective],
  imports: [CommonModule],
  exports: [NotePipe, TuningPipe, LonpPressDirective],
})
export class GlobalModule {}
