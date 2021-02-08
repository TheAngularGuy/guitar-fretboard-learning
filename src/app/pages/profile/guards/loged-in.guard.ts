import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {Store} from '@ngxs/store';
import {UserState} from '@shared-modules/store/user/user.state';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(public store: Store, public router: Router) {
  }

  canActivate(): boolean {
    const state = this.store.selectSnapshot(UserState.getState);
    console.log({state});
    if (!state.uid) {
      this.router.navigate(['profile', 'login']);
      return false;
    }
    return true;
  }
}
