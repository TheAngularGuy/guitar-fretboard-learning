import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { GameState, GameStateModel } from '@core/stores/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { IonicModule, ModalController } from '@ionic/angular';
import { Select } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.modal.html',
  styleUrls: ['./tutorial.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    NotePipeModule,
    FretboardModule,
  ],
})
export class TutorialModal implements OnInit, OnDestroy {
  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  @Select(PreferencesState.getState) preferencesState$: Observable<PreferencesStateModel>;

  constructor(
    private readonly modalCtrl: ModalController,
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy() {
  }

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
