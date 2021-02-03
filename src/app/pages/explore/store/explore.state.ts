import {Action, Selector, State, StateContext} from '@ngxs/store';
import {CAGED_SCALE} from 'src/app/constants/caged-scale.constant';
import {ChordType} from 'src/app/models/chord.model';
import {UtilsService} from 'src/app/shared/services/utils/utils.service';

import {
  ExploreSetFretEndAction,
  ExploreSetFretStartAction,
  ExploreSetSelectedChordAction,
  ExploreSetSelectedNotesAction, ExploreSetSelectedScaleAction,
} from './explore.actions';
import {Injectable} from '@angular/core';
import {MAX_FRETS} from '@constants/max-frets';

enum stateEnums {
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
    selectedNotes: UtilsService.getParsedItemFromLS(stateEnums.selectedNotes) || CAGED_SCALE,
    fretStart: UtilsService.getParsedItemFromLS(stateEnums.fretStart) || 0,
    fretEnd: UtilsService.getParsedItemFromLS(stateEnums.fretEnd) || MAX_FRETS,
    selectedChord: UtilsService.getParsedItemFromLS(stateEnums.selectedChord) || {
      noteName: 'C',
      type: 'Major',
    },
    selectedScale: UtilsService.getParsedItemFromLS(stateEnums.selectedScale) || {
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
    {patchState}: StateContext<ExploreStateModel>,
    {payload}: ExploreSetSelectedNotesAction,
  ) {
    patchState({
      selectedNotes: payload.selectedNotes,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedNotes, payload.selectedNotes);
  }

  @Action(ExploreSetFretStartAction)
  public setFretStart(
    {patchState}: StateContext<ExploreStateModel>,
    {payload}: ExploreSetFretStartAction,
  ) {
    patchState({
      fretStart: payload.fretStart,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretStart, payload.fretStart);
  }

  @Action(ExploreSetFretEndAction)
  public setFretEnd(
    {patchState}: StateContext<ExploreStateModel>,
    {payload}: ExploreSetFretEndAction,
  ) {
    patchState({
      fretEnd: payload.fretEnd,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretEnd, payload.fretEnd);
  }

  @Action(ExploreSetSelectedChordAction)
  public setSelectedChord(
    {patchState}: StateContext<ExploreStateModel>,
    {payload}: ExploreSetSelectedChordAction,
  ) {
    patchState({
      selectedChord: payload,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedChord, payload);
  }

  @Action(ExploreSetSelectedScaleAction)
  public exploreSetSelectedScaleAction(ctx: StateContext<ExploreStateModel>, action: ExploreSetSelectedScaleAction) {
    const selectedScale = {
      rootNote: action.payload.rootNote.toUpperCase(),
      scale: action.payload.scale,
      segment: action.payload.segment,
    }
    ctx.patchState({
      selectedScale,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedScale, selectedScale);
  }
}
