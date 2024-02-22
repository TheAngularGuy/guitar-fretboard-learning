import { Component, OnInit } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-slide-locate',
  templateUrl: './slide-locate.component.html',
  styleUrls: ['./slide-locate.component.scss'],
  standalone: true,
  imports: [
    LottieModule,
  ],
})
export class SlideLocateComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie/locate.json',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
