import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';

import { PreferencesState } from '../../../../store/preferences/preferences.state';

@Pipe({
  name: 'note',
})
export class NotePipe implements PipeTransform {
  constructor(private readonly store: Store) {}

  transform(value: string, ...args: any[]): string {
    if (value.includes('#')) {
      const preferences =
        this.store && this.store.selectSnapshot(PreferencesState.getState);
      if (preferences && preferences.useFlats) {
        const code = value.charCodeAt(0) + 1;
        return String.fromCharCode(code === 72 ? 65 : code) + '♭'; // 71 ==> G
      }
      return value[0] + '♯';
    }
    return value[0];
  }
}
