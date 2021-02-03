export interface Scale {
  notes: string[];
  segments: string[];
}

export interface ScaleGroup {
  rootNote: string;
  scales: {
    [key: string]: Scale;
  };
}
