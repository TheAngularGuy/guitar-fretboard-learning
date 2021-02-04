import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';

declare var Aubio: any;

@Component({
  selector: 'app-tuner',
  templateUrl: './tuner.page.html',
  styleUrls: ['./tuner.page.scss'],
})
export class TunerPage implements OnInit, AfterViewInit, OnDestroy {
  tuner: Tuner;
  lastNote: Subject<{
    name: string, cents: number, octave: number,
    frequency: number, volume: number
  }>;
  timeout: any;

  constructor() { }

  ngOnInit() {
    this.start();
    this.lastNote = new Subject();
  }

  ngAfterViewInit() {
    this.defaultNote();
  }

  ngOnDestroy() {
    this.tuner.stopRecord();
  }

  start() {
    this.tuner = new Tuner();
    this.tuner.onNoteDetected = (note) => {
      this.onNoteChanges(note);
    };

    this.tuner.init();
  }

  onNoteChanges(note) {
    this.lastNote.next(note);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.defaultNote();
    }, 5000);
  }

  defaultNote() {
    this.lastNote.next({
      name: '𝄞',
      cents: 0,
      octave: undefined,
      frequency: undefined,
      volume: undefined,
    });
  }

}

class Tuner {
  private middleA = 440;
  private semitone = 69;
  private bufferSize = 4096;
  private noteStrings = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private volumeMeter: any;
  private scriptProcessor: ScriptProcessorNode;
  private pitchDetector: any;
  private stream: MediaStream;
  onNoteDetected: (_) => void;

  constructor() {
    window.AudioContext = window.AudioContext ||
      (window as any).webkitAudioContext ||
      (window as any).mozAudioContext ||
      (window as any).msAudioContext;
    if (!window.AudioContext) {
      throw new Error('no AudioContext found');
    }
  }

  init() {
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.scriptProcessor = this.audioContext.createScriptProcessor(
      this.bufferSize,
      1,
      1,
    );
    this.volumeMeter = createAudioMeter(this.audioContext);

    Aubio().then((aubio) => {
      this.pitchDetector = new aubio.Pitch(
        'default',
        this.bufferSize,
        1,
        this.audioContext.sampleRate,
      );
      this.startRecord();
    });
  }

  startRecord() {
    const self = this;
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.stream = stream;
        const source = self.audioContext.createMediaStreamSource(stream);
        source.connect(self.analyser);
        source.connect(this.volumeMeter);
        self.analyser.connect(self.scriptProcessor);
        self.scriptProcessor.connect(self.audioContext.destination);
        self.scriptProcessor.addEventListener('audioprocess',
          (event) => {
            const frequency = self.pitchDetector.do(
              event.inputBuffer.getChannelData(0),
            );
            const volume = Math.round(this.volumeMeter.volume * 1000) / 10;
            const note = self.getNote(frequency);
            const cents = self.getCents(frequency, note);
            const octave = parseInt(String(note / 12), 10) - 1;

            if (frequency && self.onNoteDetected
              && volume > 0
              && octave <= 4) {
              self.onNoteDetected({
                name: self.noteStrings[note % 12],
                value: note,
                cents,
                octave,
                volume,
                frequency,
              });
            }
          });
      })
      .catch((error) => {
        alert(error.name + ': ' + error.message);
      });
  }

  stopRecord() {
    this.onNoteDetected = null;
    this.stream.getAudioTracks().forEach(track => {
      track.stop();
      track.enabled = false;
    });
    this.audioContext.close();
    this.scriptProcessor.disconnect();
    this.analyser.disconnect();
    this.volumeMeter.disconnect();
  }

  getNote(frequency) {
    const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2));
    return Math.round(note) + this.semitone;
  }

  getStandardFrequency(note) {
    return this.middleA * Math.pow(2, (note - this.semitone) / 12);
  }

  getCents(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.getStandardFrequency(note))) / Math.log(2),
    );
  }
}

// ----- Audio volume meter
function createAudioMeter(
  audioContext: AudioContext, clipLevel?: number, averaging?: number, clipLag?: number) {
  const processor: any = audioContext.createScriptProcessor(512);
  processor.clipping = false;
  processor.lastClip = 0;
  processor.volume = 0;
  processor.clipLevel = clipLevel || 0.98;
  processor.averaging = averaging || 0.95;
  processor.clipLag = clipLag || 750;

  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination);
  processor.addEventListener('audioprocess', volumeAudioProcess);

  processor.checkClipping =
    function () {
      if (!this.clipping) {
        return false;
      }
      if ((this.lastClip + this.clipLag) < window.performance.now()) {
        this.clipping = false;
      }
      return this.clipping;
    };

  processor.shutdown =
    function () {
      this.disconnect();
      this.onaudioprocess = null;
    };

  return processor;
}

function volumeAudioProcess(event) {
  const buf = event.inputBuffer.getChannelData(0);
  const bufLength = buf.length;
  let sum = 0;
  let x;

  // Do a root-mean-square on the samples: sum up the squares...
  for (let i = 0; i < bufLength; i++) {
    x = buf[i];
    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }
    sum += x * x;
  }

  // ... then take the square root of the sum.
  const rms = Math.sqrt(sum / bufLength);

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging);
}
