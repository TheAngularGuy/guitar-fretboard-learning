import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { CHROMATIC_SCALE } from '@constants/chromatic-scale.constant';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { GameState, GameStateModel } from '@core/stores/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { Select } from '@ngxs/store';
import { FretboardModule } from '@shared/components/fretboard/fretboard.module';
import { NotePipeModule } from '@shared/pipes/note-pipe/note-pipe.module';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-slide-how-it-works',
  templateUrl: './slide-how-it-works.component.html',
  styleUrls: ['./slide-how-it-works.component.scss'],
  standalone: true,
  imports: [
    FretboardModule,
    AsyncPipe,
    NotePipeModule,
    NgIf,
    NgForOf,
  ],
})
export class SlideHowItWorksComponent {
  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  @Select(PreferencesState.getState) preferencesState$: Observable<PreferencesStateModel>;

  chromaticScale = CHROMATIC_SCALE;

  getFretboardNotes(pref: PreferencesStateModel) {
    return FretboardManipulationService.getFretboardNotes(pref);
  }

  getSelectedFrets(gameState: GameStateModel) {
    const min = Math.min(...gameState.unlockedFrets);
    const max = Math.max(...gameState.unlockedFrets);
    return [min, max];
  }
}
