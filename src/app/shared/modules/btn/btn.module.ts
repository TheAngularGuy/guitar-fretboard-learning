import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SoundService } from '@shared-modules/services/sound/sound.service';
import { BtnComponent } from './btn.component';

@NgModule({
  declarations: [BtnComponent],
  exports: [BtnComponent],
  imports: [
    CommonModule,
  ],
  providers: [SoundService],
})
export class BtnModule {
}
