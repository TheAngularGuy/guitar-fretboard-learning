import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SoundService } from '../../services/sound/sound.service';

import { ListComponent } from './list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, IonicModule],
  exports: [ListComponent],
  providers: [SoundService],
})
export class ListModule {
}
