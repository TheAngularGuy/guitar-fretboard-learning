import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserLogInAction } from '@core/stores/user/user.actions';
import { UserState } from '@core/stores/user/user.state';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {
  destroyed$ = new Subject();

  constructor(private store: Store, private router: Router) {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngOnInit() {
    this.store.select(UserState.getState).pipe(
      filter(user => !!user.user),
      tap(user => {
        this.router.navigate(['profile']);
      }),
      takeUntil(this.destroyed$),
    ).subscribe();
  }

  onLoginWithGoogle() {
    this.store.dispatch(new UserLogInAction({ provider: 'google' }));
  }
}
