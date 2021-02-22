import {AfterViewInit, ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ModalController, NavController} from '@ionic/angular';
import {listAnimation} from 'src/app/animations/list.animation';
import {BehaviorSubject} from 'rxjs';
import {InAppStoreService} from '@shared-modules/services/in-app-store/in-app-store.service';
import {Store} from '@ngxs/store';
import {OpenOrderModalAction} from '@shared-modules/store/user/user.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations: [listAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, AfterViewInit {
  showShadow$ = new BehaviorSubject(false);
  gameModes = [
    {
      path: 'locate',
      img: 'assets/imgs/locate.svg',
      title: 'Locate',
      subtitle:
        'Locate the note on the fretboard and click on it',
    },
    {
      path: 'identify',
      img: 'assets/imgs/identify.svg',
      title: 'Identify',
      subtitle:
        'Identify which note is highlighted ' +
        'on the fretboard',
    },
    {
      path: null,
      img: 'assets/imgs/icon-pro.png',
      title: 'Get Pro',
      subtitle: `Get access to all game modes, unlock the fretboard heatmaps and more!`, // 'Get all game modes, customisations and stats'
      promo: true,
    },
    {
      path: 'locate-all',
      img: 'assets/imgs/locate-all.svg',
      title: 'Locate all positions',
      subtitle:
        'Locate all the instances of ' +
        'a note in the fretboard and click on them',
    },
    {
      path: 'identify-sound',
      img: 'assets/imgs/headphones.svg',
      title: 'Identify notes by tone',
      subtitle: `Identify which note is played by sound. Practice your musical ear`,
    },
  ];

  constructor(private navCtrl: NavController, private store: Store) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  goTo({path}: any) {
    if (!path) {
      this.openOrderModal();
      return;
    }
    this.navCtrl.navigateForward(['games', path]);
  }

  openOrderModal() {
    this.store.dispatch(new OpenOrderModalAction());
  }

  onScroll(event: any) {
    const bool = event.detail.scrollTop >= 15;
    this.showShadow$.next(bool);
  }
}
