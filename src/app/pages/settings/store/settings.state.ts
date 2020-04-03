import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UtilsService } from 'src/app/shared/services/utils/utils.service';

import { SettingsAddCustomTuningAction } from './settings.actions';
import {Injectable} from '@angular/core';

enum stateEnums {
  customTunings = 'settings_customTunings',
}

export interface SettingsStateModel {
  customTunings: string[];
}

@State<SettingsStateModel>({
  name: 'settings',
  defaults: {
    customTunings: UtilsService.getParsedItemFromLS(stateEnums.customTunings) || [],
  },
})
@Injectable()
export class SettingsState {
  @Selector()
  public static getState(state: SettingsStateModel) {
    return state;
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
    UtilsService.setParsedItemToLS(stateEnums.customTunings, newCustomTunings);
  }
}
