import { Pipe, PipeTransform } from '@angular/core';
import { TEMPO_NAMES } from '@constants/tempo-names';

@Pipe({
  name: 'tempoName',
  pure: true,
})
export class TempoNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return this.getTempoName(+value);
  }

  getTempoName(bpm: number): string {
    return TEMPO_NAMES.find(tempo => tempo.min <= bpm && tempo.max >= bpm).name;
  }

}
