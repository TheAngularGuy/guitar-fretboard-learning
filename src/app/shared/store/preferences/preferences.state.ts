import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UtilsService } from '../../services/utils/utils.service';
import {
  PreferencesSetLeftyModeAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from './preferences.actions';

enum stateEnums {
  leftHandedMode = 'preferences_leftHandedMode',
  activateSound = 'preferences_activateSound',
  tuning = 'preferences_tuning',
}

export interface PreferencesStateModel {
  leftHandedMode: boolean;
  activateSound: boolean;
  tuning: string;
}

@State<PreferencesStateModel>({
  name: 'preferences',
  defaults: {
    leftHandedMode: UtilsService.getParsedItemFromLS(stateEnums.leftHandedMode) || false,
    activateSound: UtilsService.getParsedItemFromLS(stateEnums.activateSound) || false,
    tuning: UtilsService.getParsedItemFromLS(stateEnums.tuning) || 'Standard',
  },
})
export class PreferencesState {
  // Selectors
  @Selector()
  public static getState(state: PreferencesStateModel) {
    return state;
  }

  // Reducers
  @Action(PreferencesSetLeftyModeAction)
  public setLeftHandedMode(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetLeftyModeAction,
  ) {
    patchState({ leftHandedMode: payload.leftHandedMode });
    UtilsService.setParsedItemToLS(stateEnums.leftHandedMode, payload.leftHandedMode);
  }

  @Action(PreferencesSetSoundAction)
  public setActivatedSound(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetSoundAction,
  ) {
    patchState({ activateSound: payload.activateSound });
    UtilsService.setParsedItemToLS(stateEnums.activateSound, payload.activateSound);
  }

  @Action(PreferencesSetTunningAction)
  public setGuitarTuning(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetTunningAction,
  ) {
    patchState({ tuning: payload.tuning });
    UtilsService.setParsedItemToLS(stateEnums.tuning, payload.tuning);
  }
}
