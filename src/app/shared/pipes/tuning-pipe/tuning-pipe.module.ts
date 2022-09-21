import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TuningPipe } from '@shared/pipes/tuning-pipe/tuning.pipe';

@NgModule({
  declarations: [TuningPipe],
  exports: [TuningPipe],
  imports: [CommonModule],
})
export class TuningPipeModule {
}
