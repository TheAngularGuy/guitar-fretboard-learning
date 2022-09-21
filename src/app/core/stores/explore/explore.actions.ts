import { ChordType } from '@models/chord.model';

export class ExploreSetSelectedNotesAction {
  public static readonly type = '[Explore] set selected notes';

  constructor(public payload: { selectedNotes: string[] }) {
  }
}

export class ExploreSetFretStartAction {
  public static readonly type = '[Explore] set fret start';

  constructor(public payload: { fretStart: number }) {
  }
}

export class ExploreSetFretEndAction {
  public static readonly type = '[Explore] set fret end';

  constructor(public payload: { fretEnd: number }) {
  }
}

export class ExploreSetSelectedChordAction {
  public static readonly type = '[Explore] set selected chord';

  constructor(public payload: { noteName: string; type: ChordType }) {
  }
}

export class ExploreSetSelectedScaleAction {
  public static readonly type = '[Explore] set selected scale';

  constructor(public payload: { rootNote: string; scale: string; segment: string }) {
  }
}
