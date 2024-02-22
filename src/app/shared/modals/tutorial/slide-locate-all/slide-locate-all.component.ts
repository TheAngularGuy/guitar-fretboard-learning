import { Component, OnInit } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-slide-locate-all',
  templateUrl: './slide-locate-all.component.html',
  styleUrls: ['./slide-locate-all.component.scss'],
  standalone: true,
  imports: [
    LottieModule,
  ],
})
export class SlideLocateAllComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie/locate-all.json',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
