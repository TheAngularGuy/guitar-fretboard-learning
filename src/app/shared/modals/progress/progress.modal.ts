import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { delayAnimation } from '@animations/delay.animation';
import { popAnimation } from '@animations/pop.animation';
import { LEVELS } from '@constants/levels';
import { SoundService } from '@core/services/sound/sound.service';
import { UnlockedFrets, UnlockedNotes } from '@core/stores/game/game.actions';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';


@Component({
  selector: 'app-progress',
  templateUrl: './progress.modal.html',
  styleUrls: ['./progress.modal.scss'],
  animations: [popAnimation, delayAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NotePipeModule,
  ],
})
export class ProgressModal implements OnInit, AfterViewInit, OnDestroy {
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
  preferences: PreferencesStateModel;
  destroyed$ = new Subject();

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private sound: SoundService,
    private changeDetection: ChangeDetectorRef,
  ) {
  }

  get isThereMultipleSlides() {
    return this.level?.unlockedNotes?.length && this.level?.unlockedFrets?.length;
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.listenToPreferences();
  }

  ngAfterViewInit() {
    this.updateProgress();
  }

  listenToPreferences() {
    this.store.select(PreferencesState.getState).pipe(
      tap(pref => {
        this.preferences = pref;
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  startTimmer() {
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
    LEVELS.forEach(async(level) => {
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

          // start new animation
          this.previous = level.max;
          this.updateProgress();
          this.newLevel();
        } else {
          const percentPrev = (this.previous - level.min) * (100 / (level.max - level.min));
          const percentNow = (this.current - level.min) * (100 / (level.max - level.min));
          if (percentNow > percentPrev) {
            this.sound.playCoins();
          }
          await this.animate(percentPrev, percentNow);
        }

      }
    });
  }

  clearTimmer() {
    clearInterval(this.interval);
    this.timer.nativeElement.style.display = 'none';
  }

  newLevel() {
    this.clearTimmer();

    setTimeout(() => {
      this.sound.playSuccess();
    }, 1000);
    this.showNewLevel = true;
    this.changeDetection.markForCheck();
  }

  animate(from: number, to: number) {
    // this.sound.playCoins();

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
        resolve(true);
      }, 2000);
    });
  }

  close() {
    clearInterval(this.interval);
    if (this.modalCtrl) {
      this.modalCtrl.dismiss();
      // this.sound.playClick();
    }
  }

}
