import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnComponent } from './btn.component';

@NgModule({
  declarations: [BtnComponent],
  exports: [BtnComponent],
  imports: [
    CommonModule,
  ],
})
export class BtnModule {
}
