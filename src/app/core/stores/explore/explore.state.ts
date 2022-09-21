import { Injectable } from '@angular/core';
import { CAGED_SCALE } from '@constants/caged-scale.constant';
import { MAX_FRETS } from '@constants/max-frets';
import { UtilsService } from '@core/services/utils/utils.service';
import { ChordType } from '@models/chord.model';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  ExploreSetFretEndAction,
  ExploreSetFretStartAction,
  ExploreSetSelectedChordAction,
  ExploreSetSelectedNotesAction,
  ExploreSetSelectedScaleAction,
} from './explore.actions';


enum StateEnums {
  selectedNotes = 'explore_selectedNotes',
  fretStart = 'explore_fretStart',
  fretEnd = 'explore_fretEnd',
  selectedChord = 'explore_selectedChord',
  selectedScale = 'explore_selectedScale',
}

export interface ExploreStateModel {
  selectedNotes: string[];
  fretStart: number;
  fretEnd: number;
  selectedChord: { noteName: string; type: ChordType };
  selectedScale: { rootNote: string; scale: string; segment: string };
}

@State<ExploreStateModel>({
  name: 'explore',
  defaults: {
    selectedNotes: UtilsService.getParsedItemFromLS(StateEnums.selectedNotes) || CAGED_SCALE,
    fretStart: UtilsService.getParsedItemFromLS(StateEnums.fretStart) || 0,
    fretEnd: UtilsService.getParsedItemFromLS(StateEnums.fretEnd) || MAX_FRETS,
    selectedChord: UtilsService.getParsedItemFromLS(StateEnums.selectedChord) || {
      noteName: 'C',
      type: 'Major',
    },
    selectedScale: UtilsService.getParsedItemFromLS(StateEnums.selectedScale) || {
      rootNote: 'C',
      scale: 'Major',
      segment: 'all',
    },
  },
})
@Injectable()
export class ExploreState {

  constructor() {
  }

  @Selector()
  public static getState(state: ExploreStateModel) {
    return state;
  }

  @Selector()
  public static getSelectedScale(state: ExploreStateModel) {
    return state.selectedScale;
  }

  @Action(ExploreSetSelectedNotesAction)
  public setSelectedNotes(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetSelectedNotesAction,
  ) {
    patchState({
      selectedNotes: payload.selectedNotes,
    });
    UtilsService.setParsedItemToLS(StateEnums.selectedNotes, payload.selectedNotes);
  }

  @Action(ExploreSetFretStartAction)
  public setFretStart(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetFretStartAction,
  ) {
    patchState({
      fretStart: payload.fretStart,
    });
    UtilsService.setParsedItemToLS(StateEnums.fretStart, payload.fretStart);
  }

  @Action(ExploreSetFretEndAction)
  public setFretEnd(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetFretEndAction,
  ) {
    patchState({
      fretEnd: payload.fretEnd,
    });
    UtilsService.setParsedItemToLS(StateEnums.fretEnd, payload.fretEnd);
  }

  @Action(ExploreSetSelectedChordAction)
  public setSelectedChord(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetSelectedChordAction,
  ) {
    patchState({
      selectedChord: payload,
    });
    UtilsService.setParsedItemToLS(StateEnums.selectedChord, payload);
  }

  @Action(ExploreSetSelectedScaleAction)
  public exploreSetSelectedScaleAction(ctx: StateContext<ExploreStateModel>, action: ExploreSetSelectedScaleAction) {
    const selectedScale = {
      rootNote: action.payload.rootNote.toUpperCase(),
      scale: action.payload.scale,
      segment: action.payload.segment,
    };
    ctx.patchState({
      selectedScale,
    });
    UtilsService.setParsedItemToLS(StateEnums.selectedScale, selectedScale);
  }
}
