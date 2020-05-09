import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPage implements OnInit {
  appVersion = environment.version;

  constructor() {}

  ngOnInit() {}

  goLinkedIn() {
    this.openLink('https://www.linkedin.com/in/mustapha-aouas-7918a214b/');
  }

  goGithub() {
    this.openLink('https://github.com/TheAngularGuy/guitar-fretboard-learning');
  }

  goTwitter() {
    this.openLink('https://twitter.com/TheAngularGuy');
  }

  openLink(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }
}
