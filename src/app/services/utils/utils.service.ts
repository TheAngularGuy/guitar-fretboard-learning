import { FormControl } from '@angular/forms';

export class UtilsService {
  constructor() {}

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }

  selectedFretsValidator() {
    const validator = (c: FormControl) => {
      if (!c || !c.root.get('fretStart') || !c.root.get('fretEnd')) {
        return null;
      }
      const fretStart = c.root.get('fretStart').value;
      const fretEnd = c.root.get('fretEnd').value;
      if (fretStart >= fretEnd) {
        return {
          fretError: true,
        };
      }
      return null;
    };
    return validator;
  }
}
