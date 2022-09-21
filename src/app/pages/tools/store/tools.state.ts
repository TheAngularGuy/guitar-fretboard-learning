import { Injectable } from '@angular/core';
import { UtilsService } from '@core/services/utils/utils.service';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ToolsSetMetronommeConfigAction } from '@pages/tools/store/tools.actions';

enum StateEnums {
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
    metronommeConfig: UtilsService.getParsedItemFromLS(StateEnums.metronommeConfig) || {
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
    UtilsService.setParsedItemToLS(StateEnums.metronommeConfig, action.payload.metronommeConfig);
  }

}
