import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { SlideFinishComponent } from '@shared/modals/tutorial/slide-finish/slide-finish.component';
import { SlideHowItWorksComponent } from '@shared/modals/tutorial/slide-how-it-works/slide-how-it-works.component';
import { SlideLocateAllComponent } from '@shared/modals/tutorial/slide-locate-all/slide-locate-all.component';
import { SlideIdentifyComponent } from '@shared/modals/tutorial/slide-identify/slide-identify.component';
import { SlideIntroComponent } from '@shared/modals/tutorial/slide-intro/slide-intro.component';
import { SlideLocateComponent } from '@shared/modals/tutorial/slide-locate/slide-locate.component';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';
import { NgLetModule } from 'ng-let';
import { BehaviorSubject } from 'rxjs';

const slideLeft = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(-100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(100%)' }))], {
      optional: true,
    }),
  ]),
];

const slideRight = [
  query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
  group([
    query(':enter', [style({ transform: 'translateX(100%)' }), animate('.3s ease-out', style({ transform: 'translateX(0%)' }))], {
      optional: true,
    }),
    query(':leave', [style({ transform: 'translateX(0%)' }), animate('.3s ease-out', style({ transform: 'translateX(-100%)' }))], {
      optional: true,
    }),
  ]),
];

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.modal.html',
  styleUrls: ['./tutorial.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NotePipeModule,
    FretboardModule,
    NgLetModule,

    SlideIntroComponent,
    SlideHowItWorksComponent,
    SlideFinishComponent,
    SlideLocateComponent,
    SlideIdentifyComponent,
    SlideLocateAllComponent,
  ],
  animations: [
    trigger('animSlider', [
      transition(':increment', slideRight),
      transition(':decrement', slideLeft),
    ]),
  ],
})
export class TutorialModal {
  pages = [0, 1, 2, 3, 4];
  currentSlide$ = new BehaviorSubject<number>(0);

  constructor(
    private readonly modalCtrl: ModalController,
  ) {
  }

  get lastSlideIndex() {
    return 4;
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onPrevSlide(): void {
    this.currentSlide$.next(this.currentSlide$.value - 1);
  }

  onNextSlide(): void {
    this.currentSlide$.next(this.currentSlide$.value + 1);
  }
}
