import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { listAnimation } from 'src/app/animations/list.animation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  gameModes = [
    {
      path: 'locate',
      img: 'assets/imgs/locate.svg',
      title: 'Locate',
      subtitle:
        'Locate the note on the fretboard and click on it',
    },
    {
      path: 'locate-all',
      img: 'assets/imgs/locate-all.svg',
      title: 'Locate all positions',
      subtitle:
        'Locate all the instances of ' +
        'a note in the fretboard and click on them all',
    },

    {
      path: 'identify',
      img: 'assets/imgs/identify.svg',
      title: 'Identify',
      subtitle:
        'Identify which note is highlighted ' +
        'on the fretboard',
    },
    {
      path: 'identify-sound',
      img: 'assets/imgs/headphones.svg',
      title: 'Identify notes by tone',
      subtitle: `Identify which chord is played by sound. Practice your musical ear`,
    },
  ];

  constructor(private router: Router) {}

  goTo({ path }: any) {
    this.router.navigateByUrl('games/' + path);
  }
}
