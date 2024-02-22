import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slide-finish',
  templateUrl: './slide-finish.component.html',
  styleUrls: ['./slide-finish.component.scss'],
  standalone: true,
})
export class SlideFinishComponent {
  @Output() dismiss = new EventEmitter();


  onClose() {
    this.dismiss.emit();
  }
}
