import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserState } from '@core/stores/user/user.state';
import { Store } from '@ngxs/store';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public store: Store, public router: Router) {
  }

  canActivate(): boolean {
    const state = this.store.selectSnapshot(UserState.getState);
    console.log({ state });
    if (!state.user) {
      this.router.navigate(['profile', 'login']);
      return false;
    }
    return true;
  }
}
