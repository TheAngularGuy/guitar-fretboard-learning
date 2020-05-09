import { Injectable } from '@angular/core';

@Injectable()
export class SoundService {

  constructor() { }

  playClick() {
    const audio = new Audio('assets/sounds/click.ogg');
    audio.play();
  }

  playError() {
    const audio = new Audio('assets/sounds/badstring.ogg');
    audio.play();
  }
}
