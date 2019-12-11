import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CAGED_SCALE } from 'src/app/constants/caged-scale.constant';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import {
  ExploreSetFretEndAction,
  ExploreSetFretStartAction,
  ExploreSetSelectedNotesAction,
} from './explore.actions';

enum stateEnums {
  selectedNotes = 'explore_selectedNotes',
  fretStart = 'explore_fretStart',
  fretEnd = 'explore_fretEnd',
}

export interface ExploreStateModel {
  selectedNotes: string[];
  fretStart: number;
  fretEnd: number;
}

@State<ExploreStateModel>({
  name: 'explore',
  defaults: {
    selectedNotes:
      UtilsService.getParsedItemFromLS(stateEnums.selectedNotes) || CAGED_SCALE,
    fretStart: UtilsService.getParsedItemFromLS(stateEnums.fretStart) || 0,
    fretEnd: UtilsService.getParsedItemFromLS(stateEnums.fretEnd) || 12,
  },
})
export class ExploreState {
  @Selector()
  public static getState(state: ExploreStateModel) {
    return state;
  }

  @Action(ExploreSetSelectedNotesAction)
  public setSelectedNotes(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetSelectedNotesAction,
  ) {
    patchState({
      selectedNotes: payload.selectedNotes,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedNotes, payload.selectedNotes);
  }

  @Action(ExploreSetFretStartAction)
  public setFretStart(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetFretStartAction,
  ) {
    patchState({
      fretStart: payload.fretStart,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretStart, payload.fretStart);
  }

  @Action(ExploreSetFretEndAction)
  public setFretEnd(
    { patchState }: StateContext<ExploreStateModel>,
    { payload }: ExploreSetFretEndAction,
  ) {
    patchState({
      fretEnd: payload.fretEnd,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretEnd, payload.fretEnd);
  }
}
