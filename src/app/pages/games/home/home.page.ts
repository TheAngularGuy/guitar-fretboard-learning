import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { OpenOrderModalAction } from '@shared-modules/store/user/user.actions';
import { UserState } from '@shared-modules/store/user/user.state';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { listAnimation } from 'src/app/animations/list.animation';

const GAME_MODES = [
  {
    path: 'locate',
    img: 'assets/imgs/locate.svg',
    title: 'Locate',
    subtitle:
      'Locate the note on the fretboard and click on it',
  },
  {
    path: 'identify',
    img: 'assets/imgs/identify.svg',
    title: 'Identify',
    subtitle:
      'Identify which note is highlighted ' +
      'on the fretboard',
  },
  {
    path: null,
    img: 'assets/imgs/icon-pro.png',
    title: 'Get Pro',
    subtitle: `Get access to all game modes, unlock the fretboard heatmaps and more!`, // 'Get all game modes, customisations and stats'
    promo: true,
  },
  {
    path: 'locate-all',
    img: 'assets/imgs/locate-all.svg',
    title: 'Locate all positions',
    subtitle:
      'Locate all the instances of ' +
      'a note in the fretboard and click on them',
  },
  {
    path: 'identify-sound',
    img: 'assets/imgs/headphones.svg',
    title: 'Identify notes by tone',
    subtitle: `Identify which note is played by sound. Practice your musical ear`,
  },
];

const PRACTICE_MODES = [
  {
    path: 'practice',
    img: 'assets/imgs/board.svg',
    title: 'Practice an area',
    subtitle: `Choose the notes you want to practice and the area of the fretboard you want to focus on`,
  },
];

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit, OnDestroy {
  destroyed$ = new Subject();
  showShadow$ = new BehaviorSubject(false);
  gameModes = GAME_MODES;
  practiceModes = PRACTICE_MODES;
  isPro: boolean;

  constructor(
    private readonly navCtrl: NavController,
    private readonly store: Store,
    private readonly cd: ChangeDetectorRef,
    private readonly analyticsService: AnalyticsService,
  ) {
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }

  ngOnInit() {
    this.store.select(UserState.getIsProModeUnlocked).pipe(
      tap(isPro => {
        this.isPro = isPro;
        if (!!isPro) {
          this.gameModes = [...GAME_MODES].filter(m => !m.promo);
        } else {
          this.gameModes = [...GAME_MODES];
        }
        this.cd.markForCheck();
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  ngAfterViewInit() {
  }

  goTo({ path }: any) {
    if (!path) {
      this.openOrderModal();
      return;
    }
    this.navCtrl.navigateForward(['games', path]);
    this.analyticsService.setCurrentScreen(path);
  }

  openOrderModal() {
    this.store.dispatch(new OpenOrderModalAction());
  }

  onScroll(event: any) {
    const bool = event.detail.scrollTop >= 15;
    this.showShadow$.next(bool);
  }
}
