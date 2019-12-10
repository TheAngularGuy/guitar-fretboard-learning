import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GlobalModule } from '../global/global.module';
import { FretboardComponent } from './fretboard.component';

@NgModule({
  declarations: [FretboardComponent],
  imports: [CommonModule, GlobalModule],
  exports: [FretboardComponent],
})
export class FretboardModule {}
