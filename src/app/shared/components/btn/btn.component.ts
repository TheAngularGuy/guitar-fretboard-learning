import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { SoundService } from '@core/services/sound/sound.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-btn',
  template: `
    <button [disabled]="disabled"
            (click)="onClick($event)"
            [attr.pulsate]="pulsate"
            [attr.color]="color">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnComponent implements OnInit {
  @Input() color = 'primary';
  @Input() disabled = false;
  @Input() pulsate = false;
  @Output() clicked = new Subject();

  constructor(private sound: SoundService) {
  }

  ngOnInit(): void {
  }

  onClick(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
      event.preventDefault();
      return;
    }

    this.sound.playClick();
    (event.target as HTMLButtonElement).classList.add('active');
    setTimeout(() => {
      (event.target as HTMLButtonElement).classList.remove('active');
      this.clicked.next(event);
    }, 150);
  }
}
