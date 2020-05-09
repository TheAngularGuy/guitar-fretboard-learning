import { Note } from '../../../models/note.model';

export class GameStart {
  public static readonly type = '[GAME] GameStart';

  constructor(public payload: { tuning: string }) { }
}

export class GameStop {
  public static readonly type = '[GAME] GameStop';

  constructor(public payload: { tuning: string }) { }
}

export class GoodNoteFound {
  public static readonly type = '[GAME] GoodNoteFound';

  constructor(public payload: { note: Note, tuning: string }) { }
}

export class BadNoteFound {
  public static readonly type = '[GAME] BadNoteFound';

  constructor(public payload: { note: Note, tuning: string }) { }
}
