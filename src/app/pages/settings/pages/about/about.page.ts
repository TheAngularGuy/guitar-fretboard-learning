import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UtilsService } from '@shared-modules/services/utils/utils.service';

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
    UtilsService.openLink('https://www.linkedin.com/in/mustapha-aouas-7918a214b/');
  }

  goGithub() {
    UtilsService.openLink('https://github.com/TheAngularGuy/guitar-fretboard-learning');
  }

  goTwitter() {
    UtilsService.openLink('https://twitter.com/TheAngularGuy');
  }
}
