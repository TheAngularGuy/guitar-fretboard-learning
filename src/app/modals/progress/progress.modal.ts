import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { IonSlides, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { SoundService } from '@shared-modules/services/sound/sound.service';
import { UnlockedFrets, UnlockedNotes } from '@shared-modules/store/game/game.actions';
import { delayAnimation } from '../../animations/delay.animation';
import { popAnimation } from '../../animations/pop.animation';

const LEVELS = [{
  name: 'Level 1',
  min: 0,
  max: 500,
}, {
  name: 'Level 2',
  min: 500,
  max: 1000,
  unlockedNotes: ['D', 'F', 'B'],
  unlockedFrets: [5, 6, 7, 8],
}, {
  name: 'Level 3',
  min: 1000,
  max: 1500,
  unlockedNotes: ['A#', 'C#', 'D#'],
  unlockedFrets: [9, 10],
}, {
  name: 'Level 4',
  min: 1500,
  max: 2500,
  unlockedNotes: ['F#', 'G#'],
  unlockedFrets: [11, 12, 13, 14, 15],
}, {
  name: 'Level 5',
  min: 2500,
  max: 4000,
  unlockedNotes: [],
  unlockedFrets: [16, 17],
}];

@Component({
  selector: 'app-progress',
  templateUrl: './progress.modal.html',
  styleUrls: ['./progress.modal.scss'],
  animations: [popAnimation, delayAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressModal implements AfterViewInit {
  @ViewChild('timer') timer: ElementRef<HTMLDivElement>;
  @ViewChild('line') line: ElementRef<HTMLDivElement>;
  @Input() current: number;
  @Input() previous: number;
  level: {
    name: string;
    min: number;
    max: number;
    unlockedNotes?: string[];
    unlockedFrets?: number[];
  };
  showNewLevel = false;
  interval: any;

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private sound: SoundService,
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngAfterViewInit(): void {
    this.updateProgress();

    let percent = 0;
    this.interval = setInterval(() => {
      requestAnimationFrame(() => {
        percent++;
        this.timer.nativeElement.style.width = percent + '%';

        if (percent >= 100) {
          this.close();
        }
      });
    }, 100);
  }

  updateProgress() {
    LEVELS.forEach(async (level) => {
      if (this.previous >= level.min && this.previous < level.max) {
        this.store.dispatch(new UnlockedNotes({ notes: level.unlockedNotes }));
        this.store.dispatch(new UnlockedFrets({ frets: level.unlockedFrets }));

        requestAnimationFrame(() => {
          this.level = level;
          this.changeDetection.markForCheck();
        });

        if (this.current >= level.max) {
          const percentPrev = (this.previous - level.min) * (100 / (level.max - level.min));
          const percentNow = 100;

          await this.animate(percentPrev, percentNow);
          this.previous = level.max;
          this.updateProgress();
          this.newLevel();
        } else {
          const percentPrev = (this.previous - level.min) * (100 / (level.max - level.min));
          const percentNow = (this.current - level.min) * (100 / (level.max - level.min));

          await this.animate(percentPrev, percentNow);
        }

      }
    });
  }

  newLevel() {
    clearInterval(this.interval);
    this.timer.nativeElement.style.display = 'none';

    setTimeout(() => {
      this.sound.playSuccess();
    }, 1000);
    setTimeout(() => {
      this.showNewLevel = true;
      this.changeDetection.markForCheck();
    }, 750);
  }

  animate(from: number, to: number) {
    this.sound.playCoins();

    this.line.nativeElement.style.transition = 'none';
    requestAnimationFrame(() => {
      this.line.nativeElement.style.width = from + '%';
      requestAnimationFrame(() => {
        this.line.nativeElement.style.transition = 'width 1s ease-out';
      });
    });
    setTimeout(() => {
      this.line.nativeElement.style.width = to + '%';
    }, 750);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  close() {
    clearInterval(this.interval);
    this.modalCtrl.dismiss();
    this.sound.playClick();
  }

}
