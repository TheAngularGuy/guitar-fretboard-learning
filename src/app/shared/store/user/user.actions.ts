import {UserStateModel} from '@shared-modules/store/user/user.state';

export class UserLogInAction {
  public static readonly type = '[User] login';

  constructor(public payload: { provider: 'google' | 'facebook' }) { }
}

export class SetUserAction {
  public static readonly type = '[User] set user';

  constructor(public payload: { user: UserStateModel }) { }
}

export class UserLogOutAction {
  public static readonly type = '[User] logout';

  constructor() { }
}

export class UserSetProModeAction {
  public static readonly type = '[User] User Set Pro Mode';

  constructor(public payload: { pro: boolean }) { }
}

export class OpenOrderModalAction {
  public static readonly type = '[User] Open Order Modal';

  constructor() { }
}
