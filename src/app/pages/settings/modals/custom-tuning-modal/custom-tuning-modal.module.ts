import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { GlobalModule } from 'src/app/shared/modules/global/global.module';

import { CustomTuningModalComponent } from './custom-tuning-modal.component';

@NgModule({
  entryComponents: [CustomTuningModalComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, GlobalModule],
  declarations: [CustomTuningModalComponent],
  providers: [ModalController],
  exports: [CustomTuningModalComponent],
})
export class CustomTuningModalModule {}
