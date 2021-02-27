import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  template: `<ion-router-outlet></ion-router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnInit, OnDestroy {
  destroyed$ = new Subject();


  constructor() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
  }

}
