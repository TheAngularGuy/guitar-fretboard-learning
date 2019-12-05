export class PreferencesSetLeftyModeAction {
  public static readonly type = '[Preferences] set left handed';
  constructor(public payload: { leftHandedMode: boolean }) {}
}

export class PreferencesSetSoundAction {
  public static readonly type = '[Preferences] set sound';
  constructor(public payload: { activateSound: boolean }) {}
}

export class PreferencesSetTunningAction {
  public static readonly type = '[Preferences] set tunning';
  constructor(public payload: { tuning: string }) {}
}
