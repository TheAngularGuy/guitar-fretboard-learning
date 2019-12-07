import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import {
  LocateSetFretEndAction,
  LocateSetFretStartAction,
  LocateSetSelectedNotesAction,
} from './locate.actions';

enum stateEnums {
  selectedNotes = 'locate_selectedNotes',
  fretStart = 'locate_fretStart',
  fretEnd = 'locate_fretEnd',
}

export interface LocateStateModel {
  selectedNotes: string[];
  fretStart: number;
  fretEnd: number;
}

@State<LocateStateModel>({
  name: 'locate',
  defaults: {
    selectedNotes:
      UtilsService.getParsedItemFromLS(stateEnums.selectedNotes) || CHROMATIC_SCALE,
    fretStart: UtilsService.getParsedItemFromLS(stateEnums.fretStart) || 0,
    fretEnd:
      UtilsService.getParsedItemFromLS(stateEnums.fretEnd) ||
      (window.innerWidth > 760 ? 12 : 3),
  },
})
export class LocateState {
  @Selector()
  public static getState(state: LocateStateModel) {
    return state;
  }

  @Action(LocateSetSelectedNotesAction)
  public setSelectedNotes(
    { patchState }: StateContext<LocateStateModel>,
    { payload }: LocateSetSelectedNotesAction,
  ) {
    patchState({
      selectedNotes: payload.selectedNotes,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedNotes, payload.selectedNotes);
  }

  @Action(LocateSetFretStartAction)
  public setFretStart(
    { patchState }: StateContext<LocateStateModel>,
    { payload }: LocateSetFretStartAction,
  ) {
    patchState({
      fretStart: payload.fretStart,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretStart, payload.fretStart);
  }

  @Action(LocateSetFretEndAction)
  public setFretEnd(
    { patchState }: StateContext<LocateStateModel>,
    { payload }: LocateSetFretEndAction,
  ) {
    patchState({
      fretEnd: payload.fretEnd,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretEnd, payload.fretEnd);
  }
}
