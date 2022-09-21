import { animate, style, transition, trigger } from '@angular/animations';

export const noEnterAnimation = trigger('noEnterAnimation', [
  transition(':enter', [
    style({}), animate('250ms ease-out', style({})),
  ]),
]);
