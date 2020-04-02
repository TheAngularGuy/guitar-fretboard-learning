import * as firebase from 'firebase/app';
import { environment } from 'src/environments/environment';
import { Injectable } from "@angular/core";

@Injectable()
export class AnalyticsService {
  private analitics: firebase.analytics.Analytics;

  init() {
    this.analitics = firebase.analytics();
    this.analitics.logEvent('Initialized app', { appVersion: environment.version });
  }

  getAnalitics() {
    return this.analitics;
  }
}
