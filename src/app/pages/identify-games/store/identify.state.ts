import { Action, Selector, State, StateContext } from '@ngxs/store';
import { CHROMATIC_SCALE } from 'src/app/constants/chromatic-scale.constant';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { IdentifySetFretEndAction, IdentifySetFretStartAction, IdentifySetSelectedNotesAction } from './identify.actions';

enum stateEnums {
  selectedNotes = 'identify_selectedNotes',
  fretStart = 'identify_fretStart',
  fretEnd = 'identify_fretEnd',
}

export interface IdentifyStateModel {
  selectedNotes: string[];
  fretStart: number;
  fretEnd: number;
}

@State<IdentifyStateModel>({
  name: 'identify',
  defaults: {
    selectedNotes:
      UtilsService.getParsedItemFromLS(stateEnums.selectedNotes) ||
      (window.innerWidth > 760 ? CHROMATIC_SCALE : [...CHROMATIC_SCALE].filter(n => !n.includes('#'))),
    fretStart: UtilsService.getParsedItemFromLS(stateEnums.fretStart) || 0,
    fretEnd: UtilsService.getParsedItemFromLS(stateEnums.fretEnd) || (window.innerWidth > 760 ? 17 : 3),
  },
})
export class IdentifyState {
  @Selector()
  public static getState(state: IdentifyStateModel) {
    return state;
  }

  @Action(IdentifySetSelectedNotesAction)
  public setSelectedNotes(
    { patchState }: StateContext<IdentifyStateModel>,
    { payload }: IdentifySetSelectedNotesAction,
  ) {
    patchState({
      selectedNotes: payload.selectedNotes,
    });
    UtilsService.setParsedItemToLS(stateEnums.selectedNotes, payload.selectedNotes);
  }

  @Action(IdentifySetFretStartAction)
  public setFretStart(
    { patchState }: StateContext<IdentifyStateModel>,
    { payload }: IdentifySetFretStartAction,
  ) {
    patchState({
      fretStart: payload.fretStart,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretStart, payload.fretStart);
  }

  @Action(IdentifySetFretEndAction)
  public setFretEnd(
    { patchState }: StateContext<IdentifyStateModel>,
    { payload }: IdentifySetFretEndAction,
  ) {
    patchState({
      fretEnd: payload.fretEnd,
    });
    UtilsService.setParsedItemToLS(stateEnums.fretEnd, payload.fretEnd);
  }
}
