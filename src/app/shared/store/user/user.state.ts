import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { auth } from 'firebase/app';
import { tap } from 'rxjs/operators';
import { UserLogInAction, UserLogOutAction } from './user.actions';

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

  constructor(private readonly firebaseauth: AngularFireAuth) {
    this.firebaseauth.authState.pipe(
      tap(usr => {
        console.log(usr);
      }),
    ).subscribe();
  }

  @Selector()
  public static getState(state: UserStateModel) {
    return state;
  }

  @Action(UserLogInAction)
  login(ctx: StateContext<UserStateModel>, action: UserLogInAction) {
    switch (action.payload.provider) {
      case 'facebook':
        this.firebaseauth.signInWithPopup(new auth.FacebookAuthProvider());
        break;
      case 'google':
        this.firebaseauth.signInWithPopup(new auth.GoogleAuthProvider());
        break;
    }
  }

  @Action(UserLogOutAction)
  logout() {
    this.firebaseauth.signOut();
  }

}
