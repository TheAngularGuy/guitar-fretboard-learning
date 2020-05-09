import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExplorePage {
  gameModes = [
    {
      path: 'explore',
      img: 'assets/imgs/explore-all.svg',
      title: 'Fretboard',
      subtitle: 'Explore the fretboard,' +
        ' show or hide the notes of any scale you wish',
    },
    {
      path: 'explore-notes-chords',
      img: 'assets/imgs/chords.svg',
      title: 'Explore chords',
      subtitle: 'Explore and learn all the chords with all variations' +
        ' in the standard tuning',
    },
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
