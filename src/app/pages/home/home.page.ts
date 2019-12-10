import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { listAnimation } from 'src/app/animations/list.animation';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [listAnimation],
})
export class HomePage {
  gameModes = [
    {
      path: 'locate',
      img: 'assets/imgs/locate.svg',
      name: 'Locate',
      color: 'secondary',
    },
    {
      path: 'identify',
      img: 'assets/imgs/identified.svg',
      name: 'Identify',
      color: 'secondary',
    },
    {
      path: 'explore',
      img: 'assets/imgs/explore.svg',
      name: 'Explore',
      color: 'secondary',
    },
  ];
  constructor(private router: Router) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }
}
