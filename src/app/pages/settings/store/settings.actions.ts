export class SettingsAddCustomTuningAction {
  public static readonly type = '[Settings] Add custom tuning';
  constructor(public payload: { customTuning: string }) {}
}
