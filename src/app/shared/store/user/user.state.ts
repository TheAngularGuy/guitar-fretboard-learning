import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UtilsService } from '@shared-modules/services/utils/utils.service';
import { GetProModal } from '../../../modals/get-pro/get-pro.modal';
import { TutorialModal } from '../../../modals/tutorial/tutorial.modal';
import { CloseOrderModalAction, OpenOrderModalAction, OpenTutorialModalAction, UserSetProModeAction } from './user.actions';

enum stateEnums {
  tutorial1seen = 'user_hasSeenTutorial',
}

export interface UserStateModel {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: boolean;
  };
  pro: boolean;

  hasSeenTutorial: boolean;
}

@Injectable()
@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
    pro: false,

    hasSeenTutorial: UtilsService.getParsedItemFromLS(stateEnums.tutorial1seen) || false,
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

  async openModal(component, fullscreen = false) {
    const modal = await this.modalCtrl.create({
      component,
      cssClass: fullscreen ? 'fullscreen-modal' : '',
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

  @Action(OpenTutorialModalAction)
  openTutorialModalAction(ctx: StateContext<UserStateModel>, action: OpenTutorialModalAction) {
    this.openModal(TutorialModal, true);
    ctx.patchState({
      hasSeenTutorial: true,
    });
    UtilsService.setParsedItemToLS(stateEnums.tutorial1seen, true);
  }

  @Action(OpenOrderModalAction)
  openOrderModalAction(ctx: StateContext<UserStateModel>, action: OpenOrderModalAction) {
    this.openModal(GetProModal);
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
