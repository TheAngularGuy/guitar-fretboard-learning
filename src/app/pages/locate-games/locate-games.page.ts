import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-locate-games',
  templateUrl: './locate-games.page.html',
  styleUrls: ['./locate-games.page.scss'],
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
  ];

  constructor() {}

  ngOnInit() {}
}
