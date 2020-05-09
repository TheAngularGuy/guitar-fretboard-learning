export class UserLogInAction {
  public static readonly type = '[User] login';

  constructor(public payload: { provider: 'google' | 'facebook' }) { }
}

export class UserLogOutAction {
  public static readonly type = '[User] logout';

  constructor() { }
}
