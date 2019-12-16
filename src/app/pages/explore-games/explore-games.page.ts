import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-explore-games',
  templateUrl: './explore-games.page.html',
  styleUrls: ['./explore-games.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreGamesPage {
  gameModes = [
    {
      path: 'explore',
      img: 'assets/imgs/explore.svg',
      title: 'Explore',
      subtitle: 'You can explore the fretboard, show or hide the notes as you wish.',
    },
    {
      path: 'explore-chords',
      img: 'assets/imgs/file.svg',
      title: 'Explore chords',
      subtitle: 'You can explore all the chords in the standard tuning.',
    },
    {
      img: 'assets/imgs/megaphone.svg',
      title: 'More games soon',
      subtitle: `More game modes are coming soon. If you like this app please share it with your
        friends or consider buying me a coffee by
        <a target="_blank" rel="noopener noreferrer" href="https://www.buymeacoffee.com/fiywQH2Dc">clicking here</a>.`,
      disabled: true,
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
