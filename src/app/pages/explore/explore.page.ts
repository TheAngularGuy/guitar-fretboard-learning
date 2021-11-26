import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NavController} from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { AnalyticsService } from '@shared-modules/services/mixpanel/analytics.service';
import { OpenOrderModalAction } from '@shared-modules/store/user/user.actions';
import { UserState, UserStateModel } from '@shared-modules/store/user/user.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorePage {
  @Select(UserState.getState) userState$: Observable<UserStateModel>;
  gameModes = [
    {
      path: 'explore-notes',
      img: 'assets/imgs/explore-all.svg',
      title: 'Fretboard',
      subtitle: 'Explore the fretboard,' +
        ' show or hide the notes of any scale you wish',
    },
    {
      path: 'explore-chords',
      img: 'assets/imgs/chords.svg',
      title: 'Chords',
      subtitle: 'Explore and learn all the chords with all variations' +
        ' in the standard tuning',
    },
    {
      path: 'explore-scales',
      img: 'assets/imgs/scales.svg',
      title: 'Scales',
      subtitle: 'Explore and learn all the scales in all the boxes over the fretboard',
    },
  ];

  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly analyticsService: AnalyticsService,
    ) {}

  onItemClicked(gameMode: { path: string }) {
    if (gameMode && gameMode.path) {
      this.navCtrl.navigateForward([gameMode.path], {
        relativeTo: this.route,
      });

      this.analyticsService.setCurrentScreen(gameMode.path);
    }
  }

  openOrderModal() {
    this.store.dispatch(new OpenOrderModalAction());
  }
}
