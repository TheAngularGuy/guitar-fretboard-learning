import * as firebase from 'firebase/app';

export class AnalyticsService {
  private analitics: firebase.analytics.Analytics;

  init() {
    this.analitics = firebase.analytics();
    this.analitics.logEvent('Initialized app', { appAnalyticsInit: true });
  }

  getAnalitics() {
    return this.analitics;
  }
}
