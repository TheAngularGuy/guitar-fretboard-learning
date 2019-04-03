import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { listAnimation } from 'src/app/animations/list.animation';
import { noEnterAnimation } from 'src/app/animations/no-enter.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    noEnterAnimation,
    listAnimation
  ]
})
export class HomeComponent implements OnInit {
  gameModes = [{
    path: 'locate',
    img: 'assets/imgs/locate.svg',
    name: 'Locate'
  }, {
    path: 'locate/identify',
    img: 'assets/imgs/identify.svg',
    name: 'Identify'
  }, {
    path: 'explore',
    img: 'assets/imgs/explore.svg',
    name: 'Explore'
  }];

  constructor(private router: Router) { }

  ngOnInit() { }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  openLink(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

}
