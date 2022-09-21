import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LongPressDirective } from '@shared/directives/long-press-directive/lonp-press.directive';

@NgModule({
  declarations: [LongPressDirective],
  exports: [LongPressDirective],
  imports: [CommonModule],
})
export class LongPressModule {
}
