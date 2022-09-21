import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FretboardManipulationService } from '@core/services/fretboard-manipulation/fretboard-manipulation.service';
import { UtilsService } from '@core/services/utils/utils.service';
import { GameState, GameStateModel, NotePlacementScore, NoteScoreByTuning } from '@core/stores/game/game.state';
import { PreferencesState, PreferencesStateModel } from '@core/stores/preferences/preferences.state';
import { UserState, UserStateModel } from '@core/stores/user/user.state';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';

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
  ) {
  }

  ngOnInit() {
    const noteName = this.route.snapshot.params?.note;
    this.selectedNoteName = noteName === 'global' ? null : noteName;
  }

  getScoreByCurrentTuning(preferences: PreferencesStateModel, gameState: GameStateModel) {
    return gameState.scoreByTunings.find(st => st.tuning === preferences.tuning);
  }


  getNoteScore(notes: NoteScoreByTuning[]): NoteScoreByTuning {
    if (!!this.selectedNoteName) {
      return UtilsService.clone(notes).filter((n) => n.name === this.selectedNoteName)[0];
    }
    const output: NoteScoreByTuning = {
      placements: [],
      name: null,
      bad: 0,
      good: 0,
      value: 0,
    };
    UtilsService.clone(notes).forEach(n => {
      output.placements = [...output.placements, ...n.placements];
      output.value += n.value;
      output.good += n.good;
      output.bad += n.bad;
    });
    return output;
  }

  getFretboardNotes(preferences: PreferencesStateModel) {
    return FretboardManipulationService.getFretboardNotes(preferences);
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
