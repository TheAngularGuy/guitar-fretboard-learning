export class PreferencesSetInvertedStringsModeAction {
  public static readonly type = '[Preferences] set inverted strings';

  constructor(public payload: { invertedStrings: boolean }) {
  }
}

export class PreferencesSetInvertedFretsModeAction {
  public static readonly type = '[Preferences] set inverted frets';

  constructor(public payload: { invertedFrets: boolean }) {
  }
}

export class PreferencesSetSoundAction {
  public static readonly type = '[Preferences] set sound';

  constructor(public payload: { activateSound: boolean }) {
  }
}

export class PreferencesSetFlatsModeAction {
  public static readonly type = '[Preferences] set flats';

  constructor(public payload: { useFlats: boolean }) {
  }
}

export class PreferencesSetShowOnlySelectedFretsAction {
  public static readonly type = '[Preferences] set show Only Selected Frets';

  constructor(public payload: { showOnlySelectedFrets: boolean }) {
  }
}

export class PreferencesSetTunningAction {
  public static readonly type = '[Preferences] set tunning';

  constructor(public payload: { tuning: string }) {
  }
}

export class PreferencesSetNotationAction {
  public static readonly type = '[Preferences] set notation';

  constructor(public payload: { notation: 'english' | 'german' | 'latin' | 'byzantine' | 'japanese' }) {
  }
}
