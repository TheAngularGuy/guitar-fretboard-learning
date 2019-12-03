export class UtilsService {
  constructor() {}

  /**
   * Returns a random number between min (inclusive) and max (exclusive)
   */
  getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
