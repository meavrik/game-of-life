import { BoardService } from './../services/board.service';
import { Component, OnInit } from '@angular/core';
import { LevelsService, ILevelConfig } from "app/services/levels.service";
import { GameEngineService } from "app/services/game-engine.service";

const interval: number = 600;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {

  timeout;
  accupiedPercent: string;
  goalReached: boolean = false;

  constructor(private board: BoardService, private levelsService: LevelsService, private gameEngine: GameEngineService) { }

  ngOnInit() {
    this.reset();
  }

  reset() {
    clearTimeout(this.timeout)

    this.gameEngine.stop()
    this.gameEngine.setLevel();
  }

  activate() {
    this.gameEngine.start()
    this.nextTurn();
  }

  nextTurn() {
    this.gameEngine.turn++;
    let lives = this.board.nextGeneration();
    this.gameEngine.accupied = this.board.accupied ? (this.board.accupied / this.board.totalCells) * 100 : 0;
    this.accupiedPercent = this.gameEngine.accupied.toPrecision(2) + "%";

    if (this.gameEngine.goalReached()) {

      this.goalReached = true;
    } else {
      if (lives) {
        this.timeout = setTimeout(() => { this.nextTurn(); }, interval);
      } else {
        this.gameEngine.pause()
      }
    }

  }

  nextLevel() {
    this.goalReached = false;
    this.gameEngine.nextLevel()
  }

}
