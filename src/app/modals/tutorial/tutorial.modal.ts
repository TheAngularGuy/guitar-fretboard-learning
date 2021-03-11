import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial-modal.component.html',
  styleUrls: ['./tutorial-modal.component.scss'],
})
export class TutorialModal implements OnInit {

  constructor(
    private readonly modalCtrl: ModalController,
    ) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
