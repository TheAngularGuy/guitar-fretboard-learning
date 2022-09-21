import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils/utils.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  PreferencesSetFlatsModeAction,
  PreferencesSetInvertedFretsModeAction,
  PreferencesSetInvertedStringsModeAction,
  PreferencesSetNotationAction,
  PreferencesSetSoundAction,
  PreferencesSetTunningAction,
} from './preferences.actions';


enum StateEnums {
  invertedStrings = 'preferences_invertedStrings',
  invertedFrets = 'preferences_invertedFrets',
  activateSound = 'preferences_activateSound',
  useFlats = 'preferences_useFlats',
  tuning = 'preferences_tuning',
  notation = 'preferences_notation',
}

export interface PreferencesStateModel {
  invertedStrings: boolean;
  invertedFrets: boolean;
  activateSound: boolean;
  useFlats: boolean; // ♭ instead of ♯
  tuning: string;
  notation: 'english' | 'german' | 'latin' | 'byzantine' | 'japanese';
}

@Injectable()
@State<PreferencesStateModel>({
  name: 'preferences',
  defaults: {
    invertedStrings: UtilsService.getParsedItemFromLS(StateEnums.invertedStrings) ?? false,
    invertedFrets: UtilsService.getParsedItemFromLS(StateEnums.invertedFrets) ?? false,
    activateSound: UtilsService.getParsedItemFromLS(StateEnums.activateSound) ?? true,
    useFlats: UtilsService.getParsedItemFromLS(StateEnums.useFlats) ?? false,
    tuning: UtilsService.getParsedItemFromLS(StateEnums.tuning) ?? 'Standard',
    notation: UtilsService.getParsedItemFromLS(StateEnums.notation) ?? 'english',
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
    UtilsService.setParsedItemToLS(StateEnums.invertedStrings, payload.invertedStrings);
  }

  @Action(PreferencesSetInvertedFretsModeAction)
  public setInvertedFretsMode(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetInvertedFretsModeAction,
  ) {
    patchState({ invertedFrets: payload.invertedFrets });
    UtilsService.setParsedItemToLS(StateEnums.invertedFrets, payload.invertedFrets);
  }

  @Action(PreferencesSetSoundAction)
  public setActivatedSound(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetSoundAction,
  ) {
    patchState({ activateSound: payload.activateSound });
    UtilsService.setParsedItemToLS(StateEnums.activateSound, payload.activateSound);
  }

  @Action(PreferencesSetFlatsModeAction)
  public setFlatsMode(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetFlatsModeAction,
  ) {
    patchState({ useFlats: payload.useFlats });
    UtilsService.setParsedItemToLS(StateEnums.useFlats, payload.useFlats);
  }

  @Action(PreferencesSetTunningAction)
  public setGuitarTuning(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetTunningAction,
  ) {
    patchState({ tuning: payload.tuning });
    UtilsService.setParsedItemToLS(StateEnums.tuning, payload.tuning);
  }

  @Action(PreferencesSetNotationAction)
  public preferencesSetNotationAction(
    { patchState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetNotationAction,
  ) {
    patchState({ notation: payload.notation });
    UtilsService.setParsedItemToLS(StateEnums.notation, payload.notation);
  }
}
