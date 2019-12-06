import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UtilsService } from '../../services/utils/utils.service';
import {
  PreferencesSetLeftyModeAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from './preferences.actions';

export interface PreferencesStateModel {
  leftHandedMode: boolean;
  activateSound: boolean;
  tuning: string;
}

@State<PreferencesStateModel>({
  name: 'preferences',
  defaults: {
    leftHandedMode: UtilsService.getParsedItemFromLS('preferences_leftHandedMode') || false,
    activateSound: UtilsService.getParsedItemFromLS('preferences_activateSound') || false,
    tuning: UtilsService.getParsedItemFromLS('preferences_tuning') || 'Standard',
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
    UtilsService.setParsedItemToLS('preferences_leftHandedMode', payload.leftHandedMode);
  }

  @Action(PreferencesSetSoundAction)
  public setActivatedSound(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetSoundAction,
  ) {
    patchState({ activateSound: payload.activateSound });
    UtilsService.setParsedItemToLS('preferences_activateSound', payload.activateSound);
  }

  @Action(PreferencesSetTunningAction)
  public setGuitarTuning(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetTunningAction,
  ) {
    patchState({ tuning: payload.tuning });
    UtilsService.setParsedItemToLS('preferences_tuning', payload.tuning);
  }
}
