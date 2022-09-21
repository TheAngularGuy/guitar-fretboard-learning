import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  template: `
    <ion-router-outlet></ion-router-outlet>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePage implements OnDestroy {
  destroyed$ = new Subject();

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

}
