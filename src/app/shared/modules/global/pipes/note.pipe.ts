import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { PreferencesState } from '../../../store/preferences/preferences.state';

@Pipe({
  name: 'note',
})
export class NotePipe implements PipeTransform {
  constructor() {}

  transform(value: string, bool: boolean): string {
    if (value && value.includes('#')) {
      if (bool) {
        const code = value.charCodeAt(0) + 1;
        return String.fromCharCode(code === 72 ? 65 : code) + 'b'; // 71 ==> G
      }
      return value[0] + '#';
    }
    return value;
  }
}
