import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'guitar fretboard learning';

  constructor(private router: Router) { }

  goHome() {
    this.router.navigateByUrl('');
  }

}
