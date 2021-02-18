import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Subject} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {ToolsState} from '@pages/tools/store/tools.state';
import {ToolsSetMetronommeConfigAction} from '@pages/tools/store/tools.actions';
import {TEMPO_NAMES} from '@constants/tempo-names';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.page.html',
  styleUrls: ['./metronome.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetronomePage implements OnInit, OnDestroy {
  destroyed$ = new Subject();
  bpmForm: FormGroup;
  beatsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  lastClick: number;
  interval: any;
  beat$ = new BehaviorSubject(null);

  get dots() {
    return new Array(this.bpmForm?.get('beats')?.value).fill(null);
  }

  constructor(private readonly store: Store) {
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    const metronommeConf = this.store.selectSnapshot(ToolsState.getMetronommeConfig);
    this.bpmForm = new FormGroup({
      beats: new FormControl(metronommeConf.beats, []),
      mesure: new FormControl(metronommeConf.mesure, []),
      bpm: new FormControl(metronommeConf.bpm, []),
    });

    this.bpmForm.valueChanges.pipe(
      takeUntil(this.destroyed$),
      tap((value) => {
        this.store.dispatch(new ToolsSetMetronommeConfigAction({metronommeConfig: value}));
        if (!!this.interval) {
          this.toggleMetronome();
          requestAnimationFrame(() => this.toggleMetronome());
        }
      }),
    ).subscribe();
  }

  addBpm() {
    const bpm = this.bpmForm?.get('bpm').value + 1;
    this.bpmForm.patchValue({
      bpm: this.minMaxBpm(bpm),
    });
  }

  subBpm() {
    const bpm = this.bpmForm?.get('bpm').value - 1;
    this.bpmForm.patchValue({
      bpm: this.minMaxBpm(bpm),
    });
  }

  tap() {
    const now = Date.now();
    if (this.lastClick) {
      const t = now - this.lastClick;
      const bpm = this.minMaxBpm(60 / t * 1000);

      this.bpmForm.patchValue({
        bpm,
      });
    }
    this.lastClick = now;
  }

  minMaxBpm(nb: number) {
    return Math.min(Math.max(Math.round(nb), 10), 320);
  }

  toggleMetronome() {
    if (!!this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.beat$.next(null);
      return;
    }


    const bpm = this.minMaxBpm(this.bpmForm?.get('bpm').value);
    const mesure = this.bpmForm?.get('mesure').value;
    const t = Math.round(60 / bpm * 1000) / mesure;
    const beats = this.bpmForm?.get('beats').value;
    const context = new AudioContext();
    const accentPitch = 350, offBeatPitch = 190;

    this.beat$.next(0);
    this.interval = setInterval(() => {
      const note = context.createOscillator();
      const hz = context.currentTime;
      const beat = this.beat$.getValue();

      note.connect(context.destination);
      if (beat === 0) {
        note.frequency.value = accentPitch;
      } else {
        note.frequency.value = offBeatPitch;
      }
      note.start(hz);
      note.stop(hz + 0.05);

      this.beat$.next((beat + 1) % beats === 0 ? 0 : beat + 1);
    }, t);
  }

}
