import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Select} from '@ngxs/store';
import {UserState, UserStateModel} from '@shared-modules/store/user/user.state';
import {Observable} from 'rxjs';
import {GameState, GameStateModel, NotePlacementScore, NoteScoreByTuning} from '@shared-modules/store/game/game.state';
import {PreferencesState, PreferencesStateModel} from '@shared-modules/store/preferences/preferences.state';
import {UtilsService} from '@shared-modules/services/utils/utils.service';
import {FretboardManipulationService} from '@shared-modules/services/fretboard-manipulation/fretboard-manipulation.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
})
export class NoteDetailPage implements OnInit {
  @Select(UserState.getState) userState$: Observable<UserStateModel>;
  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  @Select(PreferencesState.getState) preferencesState$: Observable<PreferencesStateModel>;
  selectedNoteName: string;

  constructor(
    private route: ActivatedRoute,
    private readonly fretboardManipulationService: FretboardManipulationService,
  ) {
  }

  ngOnInit() {
    this.selectedNoteName = this.route.snapshot.params?.note;
  }

  getScoreByCurrentTuning(preferences: PreferencesStateModel, gameState: GameStateModel) {
    return gameState.scoreByTunings.find(st => st.tuning === preferences.tuning);
  }


  getNoteScore(notes: NoteScoreByTuning[]) {
    return UtilsService.clone(notes).filter((n) => {
      return n.name === this.selectedNoteName;
    })[0];
  }

  getFretboardNotes(preferences: PreferencesStateModel) {
    return this.fretboardManipulationService.getFretboardNotes(preferences);
  }

  getFretboardColors(preferences: PreferencesStateModel, placements: NotePlacementScore[], fretStart: number, fretEnd: number) {
    const output = [];
    for (let f = fretStart; f <= fretEnd; f++) {
      const fretLine = [];
      for (let i = 0; i < 6; i++) {
        const placementFound = placements.find(plcmt => plcmt.fret === f && plcmt.string === i);
        if (!placementFound) {
          fretLine.push('transparent');
        } else {
          const percent = Math.round(placementFound.good / placementFound.occurance * 100);
          fretLine.push(this.percentToColor(percent));
        }
      }
      output.push(fretLine);
    }
    return output;
  }

  private percentToColor(percent: number): string {
    if (percent < 10) {
      return '#fb5f5f';
    } else if (percent < 20) {
      return '#fd7b57';
    } else if (percent < 30) {
      return '#fc9654';
    } else if (percent < 40) {
      return '#f7af5a';
    } else if (percent < 50) {
      return '#f7af5a';
    } else if (percent < 60) {
      return '#f1c668';
    } else if (percent < 70) {
      return '#cddf7e';
    } else if (percent < 80) {
      return '#b8dc7a';
    } else if (percent < 90) {
      return '#a1d979';
    } else if (percent < 100) {
      return '#88d57a';
    } else if (percent === 100) {
      return '#6bd17d';
    }
  }
}
