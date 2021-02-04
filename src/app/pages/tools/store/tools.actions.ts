export class ToolsSetMetronommeConfigAction {
  public static readonly type = '[Tools] Set metronomme config';

  constructor(public payload: {
    metronommeConfig: {
      bpm: number;
      beats: number;
      mesure: number;
    }
  }) {
  }
}
