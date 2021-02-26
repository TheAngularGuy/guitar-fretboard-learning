import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { GetProModal } from '../../../modals/get-pro/get-pro.modal';
import { CloseOrderModalAction, OpenOrderModalAction, UserSetProModeAction } from './user.actions';

export interface UserStateModel {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
  };

  pro: boolean;
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,

    pro: !false,
  },
})
export class UserState {
  private modal: HTMLIonModalElement;

  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly modalCtrl: ModalController,
  ) {
  }

  @Selector()
  public static getState(state: UserStateModel) {
    return state;
  }

  @Selector()
  public static getIsProModeUnlocked(state: UserStateModel) {
    return state.pro;
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: GetProModal,
      animated: true,
      swipeToClose: true,
      componentProps: {},
    });
    this.modal = modal;
    return modal.present();
  }

  closeModal() {
    if (!this.modal) {
      return;
    }
    this.modal.dismiss();
  }

  @Action(OpenOrderModalAction)
  openOrderModalAction(ctx: StateContext<UserStateModel>, action: OpenOrderModalAction) {
    this.openModal();
  }

  @Action(CloseOrderModalAction)
  closeOrderModalAction(ctx: StateContext<UserStateModel>, action: CloseOrderModalAction) {
    this.closeModal();
  }

  @Action(UserSetProModeAction)
  userSetProModeAction(ctx: StateContext<UserStateModel>, action: UserSetProModeAction) {
    if (action.payload.pro) {
      this.closeModal();
    }
    ctx.patchState({
      pro: action.payload.pro,
    });
  }

}
