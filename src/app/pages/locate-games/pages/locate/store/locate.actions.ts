export class LocateSetSelectedNotesAction {
  public static readonly type = '[Locate] set selected notes';
  constructor(public payload: { selectedNotes: string[] }) {}
}
export class LocateSetFretStartAction {
  public static readonly type = '[Locate] set fret start';
  constructor(public payload: { fretStart: number }) {}
}
export class LocateSetFretEndAction {
  public static readonly type = '[Locate] set fret end';
  constructor(public payload: { fretEnd: number }) {}
}
