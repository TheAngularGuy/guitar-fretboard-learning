import { Component, OnInit } from '@angular/core';
import { LEVELS } from '@constants/levels';
import { Select } from '@ngxs/store';
import { GameState, GameStateModel } from '@shared-modules/store/game/game.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progression',
  templateUrl: './progression.page.html',
  styleUrls: ['./progression.page.scss'],
})
export class ProgressionPage implements OnInit {

  @Select(GameState.getState) gameState$: Observable<GameStateModel>;
  levels = [...LEVELS].slice(0, 6);

  constructor() { }

  ngOnInit() {
  }

  getPercent(current: number, min: number, max: number): number {
    return Math.max(0, Math.min(100, 100 / (max - min) * (current - min)));
  }

}
