import { animate, group, query, stagger, style, transition, trigger } from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* => *', [
    query(':leave', [
      style({
        opacity: '*',
      }),
      stagger(75, [
        group([
          animate('250ms ease-out', style({
            opacity: 0
          }))
        ])
      ])
    ], { optional: true }),
    query(':enter', [
      style({
        opacity: 0,
        transform: 'translatex(-5%)'
      }),
      stagger(75, [
        group([
          animate('250ms', style({
            opacity: '*',
            transform: 'translatex(0%)'
          }))
        ])
      ])
    ], { optional: true })
  ])
]);
