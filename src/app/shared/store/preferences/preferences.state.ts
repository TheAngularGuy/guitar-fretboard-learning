import { Action, Selector, State, StateContext } from '@ngxs/store';

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
    leftHandedMode: false,
    activateSound: false,
    tuning: 'Standard',
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
    { getState, setState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetLeftyModeAction,
  ) {
    const stateModel = getState();
    stateModel.leftHandedMode = payload.leftHandedMode;
    setState(stateModel);
  }

  @Action(PreferencesSetSoundAction)
  public setActivatedSound(
    { getState, setState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetSoundAction,
  ) {
    const stateModel = getState();
    stateModel.activateSound = payload.activateSound;
    setState(stateModel);
  }

  @Action(PreferencesSetTunningAction)
  public setGuitarTuning(
    { getState, setState }: StateContext<PreferencesStateModel>,
    { payload }: PreferencesSetTunningAction,
  ) {
    const stateModel = getState();
    stateModel.tuning = payload.tuning;
    setState(stateModel);
  }
}
