import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() { }

  goTo(path: string) {
    this.router.navigate([path]);
  }

  openLink(url: string) {
    const win = window.open(url, '_blank');
    win.focus();
  }

}
