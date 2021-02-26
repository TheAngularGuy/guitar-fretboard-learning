import { InAppReview } from '@ionic-native/in-app-review/ngx';
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
import {CHROMATIC_SCALE} from '@constants/chromatic-scale.constant';

enum stateEnums {
  scoreByTunings = 'game_scoreByTunings',
  unlockedFrets = 'game_unlockedFrets',
  unlockedNotes = 'game_unlockedNotes',
  globalPoints = 'game_globalPoints',
  historic = 'game_historic',
}

export interface NotePlacementScore extends Note {
  occurance: number;
  good: number;
  bad: number;
}

export interface NoteScoreByTuning {
  name: string;
  value: number;
  good: number;
  bad: number;
  placements: NotePlacementScore[];
}

export interface Progression {
  tuning: string;
  date?: number;
  score: number;
  gameMode: string;
}

export interface ScoreByTunings {
  tuning: string;
  score: {
    points: number;
    notes: NoteScoreByTuning[];
  };
}

export interface GameStateModel {
  isPlaying: boolean;
  globalPoints: number;
  scoreByTunings: ScoreByTunings[];
  unlockedNotes: string[];
  unlockedFrets: number[];
  currentSession: {
    globalPoints: number;
    scoreByTunings: ScoreByTunings[];
  };

  historic: Progression[];
}

@Injectable()
@State<GameStateModel>({
  name: 'game',
  defaults: {
    isPlaying: false,
    globalPoints: UtilsService.getParsedItemFromLS(stateEnums.globalPoints) || 0,
    unlockedFrets: UtilsService.getParsedItemFromLS(stateEnums.unlockedFrets) || LEVELS[0].unlockedFrets,
    unlockedNotes: UtilsService.getParsedItemFromLS(stateEnums.unlockedNotes) || LEVELS[0].unlockedNotes,
    scoreByTunings: UtilsService.getParsedItemFromLS(stateEnums.scoreByTunings) || [],
    historic: UtilsService.getParsedItemFromLS(stateEnums.historic) || [],
    currentSession: null,
  },
})
export class GameState {

  constructor(
    private readonly modalCtrl: ModalController,
    private readonly inAppReview: InAppReview,
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
    let selectedNotes = [];
    if (state.unlockedNotes.length < 9) {
      selectedNotes = state.unlockedNotes;
    }
    const arr = UtilsService.shuffleArray(state.unlockedNotes);
    selectedNotes = arr.slice(0, 8);
    return [...CHROMATIC_SCALE].filter(n => selectedNotes.includes(n));
  }

  @Selector()
  public static unlockedFretsSegment(state: GameStateModel): [number, number] {
    const fretMin = Math.min(...state.unlockedFrets);
    const fretMax = Math.max(...state.unlockedFrets);

    if (state.unlockedFrets.length < 5) {
      return [fretMin, fretMax];
    }
    const n = UtilsService.getRandomInt(fretMin, fretMax - 3);
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
    });
  }

  @Action(GoodNoteFound)
  private goodNoteFound(ctx: StateContext<GameStateModel>, action: GoodNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  @Action(BadNoteFound)
  private badNoteFound(ctx: StateContext<GameStateModel>, action: BadNoteFound) {
    this.goodOrBadNoteFound(ctx, action);
  }

  private registerProgression(ctx: StateContext<GameStateModel>, prog: Progression) {
    prog.date = Date.now();
    const length = ctx.getState().historic.length;
    const historic = [...ctx.getState().historic].slice(Math.max(0, length - 100), length);
    historic.push(prog);
    ctx.patchState({
      historic,
    });
    UtilsService.setParsedItemToLS(stateEnums.historic, historic);
  }

  @Action(GameComplete)
  private gameComplete(ctx: StateContext<GameStateModel>, action: GameComplete) {
    this.registerProgression(ctx, action.payload.score);

    const state = ctx.getState();
    this.gameStop(ctx, new GameStop({tuning: action.payload.tuning}));

    // NOTE: apply current session to store
    const globalPoints = state.currentSession.globalPoints;
    const scoreByTunings = state.currentSession.scoreByTunings;

    this.openProgressModal({
      previous: state.globalPoints,
      current: state.currentSession.globalPoints,
      historic: state.historic
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
    const bad = !action.isGood;
    const tuning = action.payload.tuning;
    const note = action.payload.note;

    let globalPoints = state.currentSession.globalPoints;
    const scoreByTunings = UtilsService.clone(state.currentSession.scoreByTunings);
    const scoreByTuning = scoreByTunings.find(t => t.tuning === tuning).score;
    const scoreNote = scoreByTuning.notes.find(sn => sn.name === note.name);

    scoreByTuning.points += bad ? 0 : 10;
    globalPoints += bad ? 0 : 10;
    if (!action.payload.noPlacement && state.unlockedNotes.includes(action.payload.note.name)) {
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
            placement[bad ? 'bad' : 'good'] += 1;
          } else {
            scoreNote.placements.push({
              occurance: 1,
              good: bad ? 0 : 1,
              bad: bad ? 1 : 0,
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
            good: bad ? 0 : 1,
            bad: bad ? 1 : 0,
            occurance: 1,
            ...note,
          });
        }
        scoreByTuning.notes.push(sn);
      }
    }

    ctx.patchState({
      currentSession: {
        scoreByTunings,
        globalPoints,
      }
    });
  }

  private async openProgressModal(lastCompletedGame: { previous: number, current: number; historic: Progression[] }) {
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
    modal.onDidDismiss().then(() => {
      if (lastCompletedGame.historic.length % 9 === 0) {
        this.inAppReview.requestReview().then(res => console.log({ reviewed: res }));
      }
    });
    return modal.present();
  }

}
