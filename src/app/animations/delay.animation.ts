import { animate, style, transition, trigger } from '@angular/animations';

export const delayAnimation = trigger('delayAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
    }),
    animate('250ms 500ms ease-out',
      style({
        opacity: 1
      })),
  ]),
]);
