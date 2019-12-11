import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-locate-games',
  templateUrl: './locate-games.page.html',
  styleUrls: ['./locate-games.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocateGamesPage {
  gameModes = [
    {
      path: 'locate',
      img: 'assets/imgs/locate.svg',
      title: 'Locate',
      subtitle: 'In this game you have to locate the note on the fretboard and click on it.',
    },
    {
      path: 'locate-all',
      img: 'assets/imgs/connection.svg',
      title: 'Locate all',
      subtitle:
        'In this game you have to locate all the instances of a note in the fretboard and click on them.',
    },
    {
      img: 'assets/imgs/megaphone.svg',
      title: 'More games soon',
      subtitle: `More game modes are coming soon. If you like this app please share it with your
        friends or consider buying me a cofee by
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
