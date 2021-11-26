import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {UserLogInAction} from '@shared-modules/store/user/user.actions';
import {Subject} from 'rxjs';
import {UserState} from '@shared-modules/store/user/user.state';
import {filter, takeUntil, tap} from 'rxjs/operators';
import {Router} from '@angular/router';

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
    this.store.dispatch(new UserLogInAction({provider: 'google'}));
  }
}
