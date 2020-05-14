import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chromatic-wheel',
  templateUrl: './chromatic-wheel.component.html',
  styleUrls: ['./chromatic-wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChromaticWheelComponent implements OnInit {
  _note: string;
  _octave: string;

  @Input() set note(n: any) {
    const elName = n.name.replace('♯', 's');
    const el = document.getElementById(elName);

    if (this._note) {
      const previousElName = this._note.replace('♯', 's');
      const prevEl = document.getElementById(previousElName);
      if (prevEl) {
        prevEl.style.fill = '#1a1a1a';
      }
    }
    this._note = n.name;
    this._octave = n.octave;
    if (el) {
      el.style.fill = 'rgba(114,191,71, 0.5)';
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

}
