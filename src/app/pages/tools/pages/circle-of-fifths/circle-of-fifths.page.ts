import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {popAnimation} from '../../../../animations/pop.animation';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {takeUntil, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {fadeinAnimation} from '../../../../animations/fadein.animation';

const WHEEL = [
  {
    key: 'C',
    sub: 'A',
    harmony: [
      {
        note: 'C',
        type: 'major'
      }, {
        note: 'D',
        type: 'minor'
      }, {
        note: 'E',
        type: 'minor'
      }, {
        note: 'F',
        type: 'major'
      }, {
        note: 'G',
        type: 'major'
      }, {
        note: 'A',
        type: 'minor'
      }, {
        note: 'B',
        type: 'dim'
      },
    ]
  },
  {
    key: 'G',
    sub: 'E',
    harmony: [
      {
        note: 'G',
        type: 'major'
      }, {
        note: 'A',
        type: 'minor'
      }, {
        note: 'B',
        type: 'minor'
      }, {
        note: 'C',
        type: 'major'
      }, {
        note: 'D',
        type: 'major'
      }, {
        note: 'E',
        type: 'minor'
      }, {
        note: 'F#',
        type: 'dim'
      },
    ]
  }, {
    key: 'D',
    sub: 'B',
    harmony: [
      {
        note: 'D',
        type: 'major'
      }, {
        note: 'E',
        type: 'minor'
      }, {
        note: 'F#',
        type: 'minor'
      }, {
        note: 'G',
        type: 'major'
      }, {
        note: 'A',
        type: 'major'
      }, {
        note: 'B',
        type: 'minor'
      }, {
        note: 'C#',
        type: 'dim'
      },
    ]
  },
  {
    key: 'A',
    sub: 'F#',
    harmony: [
      {
        note: 'A',
        type: 'major'
      }, {
        note: 'B',
        type: 'minor'
      }, {
        note: 'C#',
        type: 'minor'
      }, {
        note: 'D',
        type: 'major'
      }, {
        note: 'E',
        type: 'major'
      }, {
        note: 'F#',
        type: 'minor'
      }, {
        note: 'G#',
        type: 'dim'
      },
    ]
  },
  {
    key: 'E',
    sub: 'C#',
    harmony: [
      {
        note: 'E',
        type: 'major'
      }, {
        note: 'F#',
        type: 'minor'
      }, {
        note: 'G#',
        type: 'minor'
      }, {
        note: 'A',
        type: 'major'
      }, {
        note: 'B',
        type: 'major'
      }, {
        note: 'C#',
        type: 'minor'
      }, {
        note: 'D#',
        type: 'dim'
      },
    ]
  },
  {
    key: 'B',
    sub: 'G#',
    harmony: [
      {
        note: 'B',
        type: 'major'
      }, {
        note: 'C#',
        type: 'minor'
      }, {
        note: 'D#',
        type: 'minor'
      }, {
        note: 'E',
        type: 'major'
      }, {
        note: 'F#',
        type: 'major'
      }, {
        note: 'G#',
        type: 'minor'
      }, {
        note: 'A#',
        type: 'dim'
      },
    ]
  },
  {
    key: 'F#',
    sub: 'D#',
    harmony: [
      {
        note: 'F#',
        type: 'major'
      }, {
        note: 'G#',
        type: 'minor'
      }, {
        note: 'A#',
        type: 'minor'
      }, {
        note: 'B',
        type: 'major'
      }, {
        note: 'C#',
        type: 'major'
      }, {
        note: 'D#',
        type: 'minor'
      }, {
        note: 'F',
        type: 'dim'
      },
    ]
  },
  {
    key: 'C#',
    sub: 'A#',
    harmony: [
      {
        note: 'C#',
        type: 'major'
      }, {
        note: 'D#',
        type: 'minor'
      }, {
        note: 'F',
        type: 'minor'
      }, {
        note: 'G#',
        type: 'major'
      }, {
        note: 'C#',
        type: 'major'
      }, {
        note: 'A#',
        type: 'minor'
      }, {
        note: 'C',
        type: 'dim'
      },
    ]
  },
  {
    key: 'G#',
    sub: 'F',
    harmony: [
      {
        note: 'G#',
        type: 'major'
      }, {
        note: 'A#',
        type: 'minor'
      }, {
        note: 'C',
        type: 'minor'
      }, {
        note: 'C#',
        type: 'major'
      }, {
        note: 'D#',
        type: 'major'
      }, {
        note: 'F',
        type: 'minor'
      }, {
        note: 'G',
        type: 'dim'
      },
    ]
  },
  {
    key: 'D#',
    sub: 'C',
    harmony: [
      {
        note: 'D#',
        type: 'major'
      }, {
        note: 'F',
        type: 'minor'
      }, {
        note: 'G',
        type: 'minor'
      }, {
        note: 'G#',
        type: 'major'
      }, {
        note: 'A#',
        type: 'major'
      }, {
        note: 'C',
        type: 'minor'
      }, {
        note: 'D',
        type: 'dim'
      },
    ]
  },
  {
    key: 'A#',
    sub: 'G',
    harmony: [
      {
        note: 'A#',
        type: 'major'
      }, {
        note: 'C',
        type: 'minor'
      }, {
        note: 'D',
        type: 'minor'
      }, {
        note: 'D#',
        type: 'major'
      }, {
        note: 'F',
        type: 'major'
      }, {
        note: 'G',
        type: 'minor'
      }, {
        note: 'A',
        type: 'dim'
      },
    ]
  },
  {
    key: 'F',
    sub: 'D',
    harmony: [
      {
        note: 'F',
        type: 'major'
      }, {
        note: 'G',
        type: 'minor'
      }, {
        note: 'A',
        type: 'minor'
      }, {
        note: 'A#',
        type: 'major'
      }, {
        note: 'C',
        type: 'major'
      }, {
        note: 'D',
        type: 'minor'
      }, {
        note: 'E',
        type: 'dim'
      },
    ]
  },
];

@Component({
  selector: 'app-circle-of-fifths',
  templateUrl: './circle-of-fifths.page.html',
  styleUrls: ['./circle-of-fifths.page.scss'],
  animations: [popAnimation, fadeinAnimation],
})
export class CircleOfFifthsPage implements OnInit, OnDestroy {
  selectedNote$ = new BehaviorSubject(WHEEL.filter(ob => ob.key === 'C')[0]);
  rotation$ = new BehaviorSubject(1);

  destroyed$ = new Subject();
  preferences: PreferencesStateModel;

  constructor(private store: Store) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.listenToPreferences();
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  next() {
    let index = WHEEL.findIndex(el => el.key === this.selectedNote$.getValue().key);
    if (index === 11) {
      index = -1;
    }
    this.selectedNote$.next(WHEEL[index + 1]);
    const n = this.rotation$.getValue() - 30;
    this.rotation$.next(n);
  }

  prev() {
    let index = WHEEL.findIndex(el => el.key === this.selectedNote$.getValue().key);
    if (index === 0) {
      index = 12;
    }
    this.selectedNote$.next(WHEEL[index - 1]);
    const n = this.rotation$.getValue() + 30;
    this.rotation$.next(n);
  }

}
