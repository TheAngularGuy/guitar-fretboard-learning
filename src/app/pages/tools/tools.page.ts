import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
    /*{
      path: 'tracks',
      img: 'assets/imgs/amp.svg',
      title: 'Backing tracks',
      subtitle: 'Tune your guitar in any tuning, or practice your pitch with this tuner',
    },*/
  ];

  constructor(private readonly router: Router, private readonly route: ActivatedRoute) {}

  onItemClicked(gameMode: { path: string }) {
    if (gameMode && gameMode.path) {
      this.router.navigate([gameMode.path], {
        relativeTo: this.route,
      });
    }
  }
}
