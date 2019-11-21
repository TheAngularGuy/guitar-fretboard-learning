import { animate, style, transition, trigger } from '@angular/animations';

export const slideAnimation = trigger('slideAnimation', [
  transition(':enter', [
    style({
      height: '0',
      overflow: 'hidden',
    }),
    animate(
      '250ms ease-out',
      style({
        height: '*',
      }),
    ),
  ]),
  transition(':leave', [
    style({
      height: '*',
      overflow: 'hidden',
    }),
    animate(
      '250ms ease-out',
      style({
        height: '0',
      }),
    ),
  ]),
]);
