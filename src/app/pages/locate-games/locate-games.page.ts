import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { listAnimation } from 'src/app/animations/list.animation';

@Component({
  selector: 'app-locate-games',
  templateUrl: './locate-games.page.html',
  styleUrls: ['./locate-games.page.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocateGamesPage implements OnInit {
  gameModes = [
    {
      path: 'locate',
      img: 'assets/imgs/locate.svg',
      name: 'Locate',
      text: 'In this game you have to locate the note on the fretboard and click on it.',
    },
    {
      path: 'locate-all',
      img: 'assets/imgs/connection.svg',
      name: 'Locate all',
      text:
        'In this game you have to locate all the instances of a note in the fretboard and click on them.',
    },
    {
      img: 'assets/imgs/megaphone.svg',
      name: 'More games soon',
      text: `More game modes are coming soon. If you like this app please share it with your
        friends or consider buying me a cofee by <a href="https://www.buymeacoffee.com/fiywQH2Dc">clicking here</a>.`,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
