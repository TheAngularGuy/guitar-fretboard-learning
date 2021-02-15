import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NavController} from '@ionic/angular';
import {UtilsService} from '@shared-modules/services/utils/utils.service';

@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage {
  gameModes = [
    {
      path: 'metronome',
      img: 'assets/imgs/metro.svg',
      title: 'Metronome',
      subtitle: 'Perfect your precision and speed by playing with a metronome',
    },
    {
      path: 'tuner',
      img: 'assets/imgs/tuner.svg',
      title: 'Tuner',
      subtitle: 'Tune your guitar in any tuning, or practice your pitch with this tuner',
    },
    {
      path: 'circle-of-fifths',
      img: 'assets/imgs/tuner.svg',
      title: 'Circle of fifths',
      subtitle: 'An interactive and fun tool to explore music harmony',
    },
    /*{
      path: 'tracks',
      img: 'assets/imgs/amp.svg',
      title: 'Backing tracks',
      subtitle: 'Tune your guitar in any tuning, or practice your pitch with this tuner',
    },*/
  ].filter(item => !(UtilsService.isIOS() && item.path === 'tuner'));

  constructor(
    private readonly navCtrl: NavController,
    private readonly route: ActivatedRoute,
  ) {}

  onItemClicked(gameMode: { path: string }) {
    if (gameMode && gameMode.path) {
      this.navCtrl.navigateForward([gameMode.path], {
        relativeTo: this.route,
      });
    }
  }
}
