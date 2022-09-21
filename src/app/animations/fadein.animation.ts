import { animate, style, transition, trigger } from '@angular/animations';

export const fadeinAnimation = trigger('fadeinAnimation', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'scale(0)',
    }),
    animate('250ms ease-out',
      style({
        opacity: 1,
        transform: 'scale(1)',
      })),
  ]),
]);
