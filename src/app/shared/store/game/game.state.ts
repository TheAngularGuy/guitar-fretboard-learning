import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import { BadNoteFound, GameStart, GameStop, GoodNoteFound } from '@shared-modules/store/game/game.actions';
import { Note } from '../../../models/note.model';

enum stateEnums {
  scoreByTunings = 'game_scoreByTunings',
}

interface NoteScore extends Note {
  occurance: number;
}

export interface GameStateModel {
  isPlaying: boolean;
  scoreByTunings: {
    tuning: string;
    score: {
      points: number;
      notes: {
        name: string;
        value: number;
        good: number;
        bad: number;
        placements: NoteScore[];
      }[];
    };
  }[];
  unlockedNotes: string[];
  unlockedFrets: number[];
}

@State<GameStateModel>({
  name: 'game',
  defaults: {
    isPlaying: false,
    unlockedFrets: [0, 1, 2, 3],
    unlockedNotes: ['C', 'A', 'E', 'G'],
    scoreByTunings: UtilsService.getParsedItemFromLS(stateEnums.scoreByTunings) || [],
  },
})
export class GameState {

  @Selector()
  public static getState(state: GameStateModel) {
    return state;
  }

  @Selector()
  public static scoreByTunings(state: GameStateModel) {
    return state.scoreByTunings;
  }

  @Selector()
  public static unlockedNotes(state: GameStateModel) {
    return state.unlockedNotes;
  }

  @Selector()
  public static unlockedFrets(state: GameStateModel) {
    return state.unlockedFrets;
  }

  @Selector()
  public static isPlaying(state: GameStateModel) {
    return state.isPlaying;
  }

  @Action(GameStop)
  private gameStop(ctx: StateContext<GameStateModel>, action: GameStop) {
    ctx.patchState({
      isPlaying: false,
    });
  }

  @Action(GameStart)
  private gameStart(ctx: StateContext<GameStateModel>, action: GameStart) {
    const tuning = action.payload.tuning;
    const scoreByTunings = UtilsService.clone(ctx.getState().scoreByTunings);
    if (!scoreByTunings.filter(t => t.tuning === tuning).length) {
      scoreByTunings.push({
        tuning,
        score: {
          points: 0,
          notes: [],
        },
      });

      ctx.patchState({ scoreByTunings, isPlaying: true });
      UtilsService.setParsedItemToLS(stateEnums.scoreByTunings, scoreByTunings);
    } else {
      ctx.patchState({ isPlaying: true });
    }
  }

  @Action(GoodNoteFound)
  private goodNoteFound(ctx: StateContext<GameStateModel>, action: GoodNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  @Action(BadNoteFound)
  private badNoteFound(ctx: StateContext<GameStateModel>, action: BadNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  // utils ----
  private goodOrBadNoteFound(ctx: StateContext<GameStateModel>,
                             action: GoodNoteFound | BadNoteFound) {

    const bad = action.constructor.name !== 'GoodNoteFound';
    const tuning = action.payload.tuning;
    const note = action.payload.note;

    const scoreByTunings = UtilsService.clone(ctx.getState().scoreByTunings);
    const scoreByTuning = scoreByTunings.find(t => t.tuning === tuning).score;
    const scoreNote = scoreByTuning.notes.find(sn => sn.name === note.name);

    scoreByTuning.points += bad ? -10 : 10;
    if (!!scoreNote) {
      scoreNote.value += bad ? -1 : 1;
      scoreNote[bad ? 'bad' : 'good'] += 1;
      scoreNote.name = note.name;

      if (note.string != null && note.fret != null) {
        const placement = scoreNote.placements.find(p => p.name === note.name
          && p.fret === note.fret
          && p.string === note.string);

        if (!!placement) {
          placement.occurance += 1;
        } else {
          scoreNote.placements.push({
            occurance: 1,
            ...note,
          });
        }
      }

    } else {
      const sn = {
        name: note.name,
        value: 1,
        good: bad ? 0 : 1,
        bad: bad ? 1 : 0,
        placements: [],
      };
      if (note.string != null && note.fret != null) {
        sn.placements.push({
          occurance: 1,
          ...note,
        });
      }
      scoreByTuning.notes.push(sn);
    }

    ctx.patchState({ scoreByTunings });
    UtilsService.setParsedItemToLS(stateEnums.scoreByTunings, scoreByTunings);
  }

}
