import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.page.html',
  styleUrls: ['./metronome.page.scss'],
})
export class MetronomePage implements OnInit {
  bpmForm: FormGroup;
  beatsList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  lastClick: number;
  interval: any;
  beat: number;

  get dots() {
    return new Array(this.bpmForm?.get('beats')?.value).fill(null);
  }

  constructor() { }

  ngOnInit() {
    this.bpmForm = new FormGroup({
      beats: new FormControl(4, [Validators.requiredTrue]),
      bpm: new FormControl(120, [Validators.requiredTrue]),
    });
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
    return Math.min(Math.max(Math.round(nb), 30), 320);
  }

  toggleMetronome() {
    if (!!this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      this.beat = null;
      return;
    }

    window.AudioContext = window.AudioContext ||
      (window as any).webkitAudioContext ||
      (window as any).mozAudioContext ||
      (window as any).msAudioContext;
    const bpm = this.minMaxBpm(this.bpmForm?.get('bpm').value);
    const t = Math.round(60 / bpm * 1000);
    const beats = this.bpmForm?.get('beats').value;
    const context = new AudioContext();
    const accentPitch = 350, offBeatPitch = 190;

    this.beat = 0;
    this.interval = setInterval(() => {
      const note = context.createOscillator();
      const hz = context.currentTime;
      note.connect(context.destination);
      if (this.beat === 0) {
        note.frequency.value = accentPitch;
      } else {
        note.frequency.value = offBeatPitch;
      }
      note.start(hz);
      note.stop(hz + 0.05);
      this.beat = (this.beat + 1) % beats === 0 ? 0 : this.beat + 1;
    }, t);
  }

}
