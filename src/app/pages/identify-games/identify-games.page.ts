import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-identify-games',
  templateUrl: './identify-games.page.html',
  styleUrls: ['./identify-games.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdentifyGamesPage {
  gameModes = [
    {
      path: 'identify',
      img: 'assets/imgs/identified.svg',
      title: 'Identify',
      subtitle: 'In this game you have to identify which note is highlighted on the fretboard.',
    },
    {
      img: 'assets/imgs/headphones.svg',
      title: 'Identify by sound',
      subtitle: `In this game you have to identify which note is played.`,
      disabled: true,
    },
    {
      img: 'assets/imgs/megaphone.svg',
      title: 'More games soon',
      subtitle: `More game modes are coming soon. If you like this app please share it with your
        friends or consider buying me a cofee by <a href="https://www.buymeacoffee.com/fiywQH2Dc">clicking here</a>.`,
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
