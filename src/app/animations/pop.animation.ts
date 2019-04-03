import { animate, style, transition, trigger } from '@angular/animations';


export const popAnimation = trigger('popAnimation', [
  transition('* => *', [
    style({
      transform: 'scale(0)',
      overflow: 'hidden'
    }),
    animate('250ms ease-out', style({
      transform: 'scale(1)',
    }))
  ]), transition(':enter', [
    style({
      transform: 'scale(0)',
      overflow: 'hidden'
    }),
    animate('250ms ease-out', style({
      transform: 'scale(1)',
    }))
  ]), transition(':leave', [
    style({
      transform: 'scale(1)',
      overflow: 'hidden'
    }),
    animate('250ms ease-out', style({
      transform: 'scale(0)',
    }))
  ]),
]);
