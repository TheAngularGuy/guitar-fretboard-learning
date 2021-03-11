import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { FretboardManipulationService } from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';
import { GameState, GameStateModel } from '@shared-modules/store/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@shared-modules/store/preferences/preferences.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.modal.html',
  styleUrls: ['./tutorial.modal.scss'],
})
export class TutorialModal implements OnInit {
  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  @Select(PreferencesState.getState) preferencesState$: Observable<PreferencesStateModel>;

  constructor(
    private readonly modalCtrl: ModalController,
  ) { }

  ngOnInit() {}

  getFretboardNotes(pref: PreferencesStateModel) {
    return FretboardManipulationService.getFretboardNotes(pref);
  }

  getSelectedFrets(gameState: GameStateModel) {
    const min = Math.min(...gameState.unlockedFrets);
    const max = Math.max(...gameState.unlockedFrets);
    return [min, max];
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
