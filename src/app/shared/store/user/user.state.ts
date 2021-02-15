import {Injectable, NgZone} from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {auth} from 'firebase/app';
import {SetUserAction, UserLogInAction, UserLogOutAction} from './user.actions';
import {environment} from '../../../../environments/environment';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

export interface UserStateModel {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    uid: undefined,
    email: undefined,
    displayName: undefined,
    photoURL: undefined,
    emailVerified: undefined,
  },
})
export class UserState {

  constructor(
    private readonly firebaseauth: AngularFireAuth,
    private readonly ngZone: NgZone,
    private readonly router: Router
  ) {
  }

  @Selector()
  public static getState(state: UserStateModel) {
    return state;
  }

  @Action(UserLogInAction)
  login(ctx: StateContext<UserStateModel>, action: UserLogInAction) {
    switch (action.payload.provider) {
      case 'facebook':
        this.firebaseauth.signInWithRedirect(new auth.FacebookAuthProvider());
        break;
      case 'google':
        this.firebaseauth.signInWithRedirect(new auth.GoogleAuthProvider());
        break;
    }
  }

  @Action(UserLogOutAction)
  logout(ctx: StateContext<UserStateModel>) {
    this.firebaseauth.signOut().then(() => {
      this.ngZone.run(() => {
        ctx.patchState({
          uid: undefined,
          email: undefined,
          displayName: undefined,
          photoURL: undefined,
          emailVerified: undefined,
        });
        this.router.navigate(['profile', 'login']);
      });
    });
  }

  @Action(SetUserAction)
  setUserAction(ctx: StateContext<UserStateModel>, action: SetUserAction) {
    ctx.patchState({
      ...action.payload.user
    });
  }

  optOutOfAnalitics() {
    const gaProperty = environment.firebaseConfig.measurementId;
    const disableStr = 'ga-disable-' + gaProperty;
    document.cookie = disableStr + '=true; expires=Thu, 31 Dec 2099 23:59:59 UTC;';
    window[disableStr] = true;
  }

}
