import { BoardService } from 'app/services/board.service';
import { ILevelConfig } from 'app/services/levels.service';
import { LevelsService } from 'app/services/levels.service';
import { Injectable } from '@angular/core';

const startAtLevel: number = 2;
@Injectable()
export class GameEngineService {
  turn: number = 0;
  isStarted: boolean = false;
  currentLevel: number = 0;
  currentLevelConfig: ILevelConfig;
  cellsLeft: number = 0;
  accupied: number;

  constructor(private levelsService: LevelsService, private board: BoardService) {
    //this.nextLevel();
    this.currentLevel = startAtLevel;
  }
  stop() {
    this.isStarted = false;

  }

  pause() {

  }

  start() {
    this.isStarted = true;
  }
  setLevel() {
    this.accupied = 0;
    this.turn = 0;
    this.currentLevelConfig = this.levelsService.levels[this.currentLevel];

    this.board.generateNew(this.currentLevelConfig.grid.rows, this.currentLevelConfig.grid.columns);

    this.currentLevelConfig.cellsConfig.forEach(cell => {
      this.board.setCellPosition(cell.x, cell.y, cell.isAlive)
    })

    this.cellsLeft = this.currentLevelConfig.cells;
  }

  goalReached(): boolean {

    if (this.currentLevelConfig.goal.accupie && this.accupied >= this.currentLevelConfig.goal.accupie) {
      return true;
    }
    console.log('aaaaaa '+this.currentLevelConfig.goal.minTurns);
    
    if (this.currentLevelConfig.goal.minTurns && this.turn >= this.currentLevelConfig.goal.minTurns) {
      return true;
    }

    return false;
  }

  nextLevel() {
    this.stop();
    this.currentLevel++;


    this.setLevel();
    console.log('new level ' + this.currentLevel);
  }


}
