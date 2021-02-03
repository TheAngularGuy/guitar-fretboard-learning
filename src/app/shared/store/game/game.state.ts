import {Note} from '@models/note.model';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UtilsService} from '@shared-modules/services/utils/utils.service';
import {
  BadNoteFound,
  GameComplete,
  GameStart,
  GameStop,
  GoodNoteFound, UnlockedFrets, UnlockedNotes,
} from '@shared-modules/store/game/game.actions';
import {ModalController} from '@ionic/angular';
import {ProgressModal} from '../../../modals/progress/progress.modal';
import {Injectable} from '@angular/core';
import {LEVELS} from '@constants/levels';

enum stateEnums {
  scoreByTunings = 'game_scoreByTunings',
  unlockedFrets = 'game_unlockedFrets',
  unlockedNotes = 'game_unlockedNotes',
  globalPoints = 'game_globalPoints',
}

interface NoteScore extends Note {
  occurance: number;
}

interface ScoreByTunings {
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
};

export interface GameStateModel {
  isPlaying: boolean;
  globalPoints: number;
  scoreByTunings: ScoreByTunings[];
  unlockedNotes: string[];
  unlockedFrets: number[];
  currentSession: {
    globalPoints: number;
    scoreByTunings: ScoreByTunings[];
  }
}

@Injectable()
@State<GameStateModel>({
  name: 'game',
  defaults: {
    isPlaying: false,
    globalPoints: UtilsService.getParsedItemFromLS(stateEnums.globalPoints) || 490, // TODO remove this
    unlockedFrets: UtilsService.getParsedItemFromLS(stateEnums.unlockedFrets) || LEVELS[0].unlockedFrets,
    unlockedNotes: UtilsService.getParsedItemFromLS(stateEnums.unlockedNotes) || LEVELS[0].unlockedNotes,
    scoreByTunings: UtilsService.getParsedItemFromLS(stateEnums.scoreByTunings) || [],
    currentSession: null,
  },
})
export class GameState {

  constructor(
    private readonly modalCtrl: ModalController,
  ) {
  }

  @Selector()
  public static getState(state: GameStateModel) {
    return state;
  }

  @Selector()
  public static scoreByTunings(state: GameStateModel) {
    return state.scoreByTunings;
  }

  @Selector()
  public static scoreGlobal(state: GameStateModel) {
    return state.globalPoints;
  }

  @Selector()
  public static unlockedNotes(state: GameStateModel) {
    return state.unlockedNotes;
  }

  @Selector()
  public static unlockedNotesSegment(state: GameStateModel) {
    if (state.unlockedNotes.length < 9) {
      return state.unlockedNotes;
    }
    const arr = UtilsService.shuffleArray(state.unlockedNotes);
    return arr.slice(0, 8).sort();
  }

  @Selector()
  public static unlockedFretsSegment(state: GameStateModel): [number, number] {
    const fretMin = Math.min(...state.unlockedFrets);
    const fretMax = Math.max(...state.unlockedFrets);

    if (state.unlockedFrets.length < 5) {
      return [fretMin, fretMax];
    }
    const n = UtilsService.getRandomInt(fretMin, fretMax - 4);
    return [n, n + 3];
  }

  @Selector()
  public static unlockedFrets(state: GameStateModel) {
    return state.unlockedFrets;
  }

  @Selector()
  public static isPlaying(state: GameStateModel) {
    return state.isPlaying;
  }

  @Action(UnlockedFrets)
  private unlockedFrets(ctx: StateContext<GameStateModel>, action: UnlockedFrets) {
    if (!action.payload.frets) {
      return;
    }
    let frets = [...ctx.getState().unlockedFrets];
    frets = Array.from(new Set([...frets, ...action.payload.frets]));
    ctx.patchState({
      unlockedFrets: frets,
    });
    UtilsService.setParsedItemToLS(stateEnums.unlockedFrets, frets);
  }

  @Action(UnlockedNotes)
  private unlockedNotes(ctx: StateContext<GameStateModel>, action: UnlockedNotes) {
    if (!action.payload.notes) {
      return;
    }
    let notes = [...ctx.getState().unlockedNotes];
    notes = Array.from(new Set([...notes, ...action.payload.notes]));
    ctx.patchState({
      unlockedNotes: notes,
    });
    UtilsService.setParsedItemToLS(stateEnums.unlockedNotes, notes);
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

      ctx.patchState({
        scoreByTunings,
      });
      UtilsService.setParsedItemToLS(stateEnums.scoreByTunings, scoreByTunings);
    }

    ctx.patchState({
      isPlaying: true,
      currentSession: {
        scoreByTunings,
        globalPoints: ctx.getState().globalPoints,
      }
    })
  }

  @Action(GoodNoteFound)
  private goodNoteFound(ctx: StateContext<GameStateModel>, action: GoodNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  @Action(BadNoteFound)
  private badNoteFound(ctx: StateContext<GameStateModel>, action: BadNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  @Action(GameComplete)
  private gameComplete(ctx: StateContext<GameStateModel>, action: GameComplete) {
    const state = ctx.getState();
    this.gameStop(ctx, new GameStop({tuning: action.payload.tuning}));

    // NOTE: apply current session to store
    const globalPoints = state.currentSession.globalPoints;
    const scoreByTunings = state.currentSession.scoreByTunings;
    this.openProgressModal({
      previous: state.globalPoints,
      current: state.currentSession.globalPoints,
    });
    ctx.patchState({
      scoreByTunings,
      globalPoints,
    });
    UtilsService.setParsedItemToLS(stateEnums.scoreByTunings, scoreByTunings);
    UtilsService.setParsedItemToLS(stateEnums.globalPoints, globalPoints);
  }

  // utils ----
  private goodOrBadNoteFound(ctx: StateContext<GameStateModel>, action: GoodNoteFound | BadNoteFound) {
    const state = ctx.getState();
    const bad = action.constructor.name !== 'GoodNoteFound';
    const tuning = action.payload.tuning;
    const note = action.payload.note;

    let globalPoints = state.currentSession.globalPoints;
    const scoreByTunings = UtilsService.clone(state.currentSession.scoreByTunings);
    const scoreByTuning = scoreByTunings.find(t => t.tuning === tuning).score;
    const scoreNote = scoreByTuning.notes.find(sn => sn.name === note.name);

    scoreByTuning.points += bad ? -10 : 10;
    globalPoints += bad ? 0 : 10;
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

    ctx.patchState({
      currentSession: {
        scoreByTunings,
        globalPoints,
      }
    });
  }

  private async openProgressModal(lastCompletedGame: { previous: number, current: number }) {
    const modal = await this.modalCtrl.create({
      component: ProgressModal,
      animated: true,
      swipeToClose: true,
      cssClass: 'modal-transparent',
      componentProps: {
        current: lastCompletedGame.current,
        previous: lastCompletedGame.previous,
      },
    });
    return modal.present();
  }

}
