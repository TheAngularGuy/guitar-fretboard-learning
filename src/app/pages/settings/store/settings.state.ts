import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils/utils.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';

import { SettingsAddCustomTuningAction } from './settings.actions';

enum StateEnums {
  customTunings = 'settings_customTunings',
}

export interface SettingsStateModel {
  customTunings: string[];
}

@Injectable()
@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    customTunings: UtilsService.getParsedItemFromLS(StateEnums.customTunings) || [],
  },
})
export class SettingsState {
  @Selector()
  public static getState(state: SettingsStateModel) {
    return state;
  }

  @Selector()
  public static getCustomTunings(state: SettingsStateModel) {
    return state?.customTunings;
  }

  @Action(SettingsAddCustomTuningAction)
  public add(
    { getState, patchState }: StateContext<SettingsStateModel>,
    { payload }: SettingsAddCustomTuningAction,
  ) {
    const state = getState();
    const newCustomTunings = [...state.customTunings, payload.customTuning];
    patchState({
      customTunings: newCustomTunings,
    });
    UtilsService.setParsedItemToLS(StateEnums.customTunings, newCustomTunings);
  }
}
