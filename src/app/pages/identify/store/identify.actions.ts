export class IdentifySetSelectedNotesAction {
  public static readonly type = '[Identify] set selected notes';
  constructor(public payload: { selectedNotes: string[] }) {}
}
export class IdentifySetFretStartAction {
  public static readonly type = '[Identify] set fret start';
  constructor(public payload: { fretStart: number }) {}
}
export class IdentifySetFretEndAction {
  public static readonly type = '[Identify] set fret end';
  constructor(public payload: { fretEnd: number }) {}
}
