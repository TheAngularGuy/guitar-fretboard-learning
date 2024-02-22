import { Component, OnInit } from '@angular/core';
import { AnimationOptions, LottieModule } from 'ngx-lottie';

@Component({
  selector: 'app-slide-identify',
  templateUrl: './slide-identify.component.html',
  styleUrls: ['./slide-identify.component.scss'],
  standalone: true,
  imports: [
    LottieModule,
  ],
})
export class SlideIdentifyComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/lottie/identify.json',
  };

  constructor() {
  }

  ngOnInit() {
  }

}
