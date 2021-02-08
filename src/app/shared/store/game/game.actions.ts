import { Note } from '@models/note.model';

export class GameStart {
  public static readonly type = '[GAME] GameStart';

  constructor(public payload: { tuning: string }) { }
}

export class GameStop {
  public static readonly type = '[GAME] GameStop';

  constructor(public payload: { tuning: string }) { }
}

export class GameComplete {
  public static readonly type = '[GAME] GameComplete';

  constructor(public payload: { tuning: string }) { }
}

export class GoodNoteFound {
  public static readonly type = '[GAME] GoodNoteFound';
  isGood = true;

  constructor(public payload: { note: Note, tuning: string, noPlacement?: boolean }) { }
}

export class BadNoteFound {
  public static readonly type = '[GAME] BadNoteFound';
  isGood = false;

  constructor(public payload: { note: Note, tuning: string, noPlacement?: boolean }) { }
}

export class UnlockedFrets {
  public static readonly type = '[GAME] UnlockedFrets';

  constructor(public payload: { frets: number[] }) { }
}

export class UnlockedNotes {
  public static readonly type = '[GAME] UnlockedNotes';

  constructor(public payload: { notes: string[] }) { }
}
