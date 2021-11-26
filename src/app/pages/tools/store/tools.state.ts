import {Action, Selector, State, StateContext} from '@ngxs/store';
import {UtilsService} from 'src/app/shared/services/utils/utils.service';
import {Injectable} from '@angular/core';
import {ToolsSetMetronommeConfigAction} from '@pages/tools/store/tools.actions';
import {SettingsStateModel} from '@pages/settings/store/settings.state';

enum stateEnums {
  metronommeConfig = 'tools_metronommeConfig',
}

export interface ToolsStateModel {
  metronommeConfig: {
    bpm: number;
    beats: number;
    mesure: number;
  };
}

@Injectable()
@State<ToolsStateModel>({
  name: 'tools',
  defaults: {
    metronommeConfig: UtilsService.getParsedItemFromLS(stateEnums.metronommeConfig) || {
      bpm: 120,
      beats: 4,
      mesure: 1,
    },
  },
})
export class ToolsState {

  constructor() {
  }

  @Selector()
  public static getState(state: ToolsStateModel) {
    return state;
  }

  @Selector()
  public static getMetronommeConfig(state: ToolsStateModel) {
    return state.metronommeConfig;
  }

  @Action(ToolsSetMetronommeConfigAction)
  toolsSetMetronommeConfigAction(ctx: StateContext<ToolsStateModel>, action: ToolsSetMetronommeConfigAction) {
    ctx.patchState({
      metronommeConfig: action.payload.metronommeConfig,
    });
    UtilsService.setParsedItemToLS(stateEnums.metronommeConfig, action.payload.metronommeConfig);
  }

}
