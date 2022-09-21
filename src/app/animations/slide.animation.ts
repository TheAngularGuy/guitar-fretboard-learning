import { animate, style, transition, trigger } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({
      opacity: '0',
      overflow: 'hidden',
    }),
    animate(
      '250ms ease-out',
      style({
        opacity: '!',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      height: '!',
      opacity: '!',
      overflow: 'hidden',
    }),
    animate(
      '250ms ease-out',
      style({
        height: '0',
        opacity: '0',
        overflow: 'hidden',
      }),
    ),
  ]),
]);
