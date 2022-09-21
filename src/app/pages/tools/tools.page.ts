import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from '@core/services/utils/utils.service';
import { OpenOrderModalAction } from '@core/stores/user/user.actions';
import { UserState, UserStateModel } from '@core/stores/user/user.state';
import { NavController } from '@ionic/angular';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage {
  @Select(UserState.getState) userState$: Observable<UserStateModel>;
  gameModes = [
    {
      path: 'metronome',
      img: 'assets/imgs/metro.svg',
      title: 'Metronome',
      subtitle: 'Perfect your precision and speed by playing with a metronome',
    },
    {
      path: 'circle-of-fifths',
      img: 'assets/imgs/circle-of-fifth.svg',
      title: 'Circle of fifths',
      subtitle: 'An interactive and fun tool to explore music harmony',
    },
    {
      path: 'tuner',
      img: 'assets/imgs/tuner.svg',
      title: 'Tuner',
      subtitle: 'Tune your guitar in any tuning, or practice your pitch with this tuner',
    },
    /*
     {
     path: 'tracks',
     img: 'assets/imgs/amp.svg',
     title: 'Backing tracks',
     subtitle: 'Tune your guitar in any tuning, or practice your pitch with this tuner',
     },*/
  ].filter(el => {
    if (this.utils.isIOS) {
      return el.path !== 'tuner';
    }
    return true;
  });

  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly utils: UtilsService,
  ) {
  }

  onItemClicked(gameMode: { path: string }) {
    if (gameMode && gameMode.path) {
      this.navCtrl.navigateForward([gameMode.path], {
        relativeTo: this.route,
      });
    }
  }

  openOrderModal() {
    this.store.dispatch(new OpenOrderModalAction());
  }
}
