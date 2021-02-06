import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-chromatic-wheel',
  templateUrl: './chromatic-wheel.component.html',
  styleUrls: ['./chromatic-wheel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChromaticWheelComponent implements OnInit {
  elementSelected$ = new BehaviorSubject(null);
  _note: string;
  _octave: string;

  @Input() set note(n: any) {
    const elName = n.name.replace('♯', 's');
    this.elementSelected$.next(elName);

    this._note = n.name;
    this._octave = n.octave;
    this.cd.markForCheck();
  }

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
  }

}
