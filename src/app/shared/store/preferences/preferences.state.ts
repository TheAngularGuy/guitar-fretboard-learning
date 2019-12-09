import { Action, Selector, State, StateContext } from '@ngxs/store';

import { UtilsService } from '../../services/utils/utils.service';
import {
  PreferencesSetInvertedFretsModeAction,
  PreferencesSetInvertedStringsModeAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from './preferences.actions';

enum stateEnums {
  invertedStrings = 'preferences_invertedStrings',
  invertedFrets = 'preferences_invertedFrets',
  activateSound = 'preferences_activateSound',
  tuning = 'preferences_tuning',
}

export interface PreferencesStateModel {
  invertedStrings: boolean;
  invertedFrets: boolean;
  activateSound: boolean;
  tuning: string;
}

@State<PreferencesStateModel>({
  name: 'preferences',
  defaults: {
    invertedStrings: UtilsService.getParsedItemFromLS(stateEnums.invertedStrings) || false,
    invertedFrets: UtilsService.getParsedItemFromLS(stateEnums.invertedFrets) || false,
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
  @Action(PreferencesSetInvertedStringsModeAction)
  public setInvertedStringsMode(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetInvertedStringsModeAction,
  ) {
    patchState({ invertedStrings: payload.invertedStrings });
    UtilsService.setParsedItemToLS(stateEnums.invertedStrings, payload.invertedStrings);
  }

  @Action(PreferencesSetInvertedFretsModeAction)
  public setInvertedFretsMode(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetInvertedFretsModeAction,
  ) {
    patchState({ invertedFrets: payload.invertedFrets });
    UtilsService.setParsedItemToLS(stateEnums.invertedFrets, payload.invertedFrets);
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
