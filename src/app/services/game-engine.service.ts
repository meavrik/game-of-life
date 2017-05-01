import { World } from './../game/world';
import { Cell } from './../cell';
import { BoardService } from 'app/services/board.service';
import { ILevelConfig } from 'app/services/levels.service';
import { LevelsService } from 'app/services/levels.service';
import { Injectable } from '@angular/core';


@Injectable()
export class GameEngineService {

  currentLevel: number = 0;
  currentLevelConfig: ILevelConfig;
  cellsLeft: number = 0;
  currentWorld: World;

  constructor(private levelsService: LevelsService, private boardService: BoardService) {

  }

  startGame(startAtLevel: number = 0, testing: boolean = false) {
    this.currentLevel = startAtLevel;
    this.setWorld();
  }

  stop() {
    this.currentWorld.stopLife();
  }

  setWorld() {
    this.currentLevelConfig = this.levelsService.levels[this.currentLevel];
    this.currentWorld = new World(this.boardService);
    this.currentWorld.init(this.currentLevelConfig);

    this.cellsLeft = this.currentLevelConfig.cellsLeft;
  }

  startWorldLife() {
    this.currentWorld.startLife();
  }

  nextLevel() {
    this.currentLevel++;
    console.log('new level ' + this.currentLevel);
    this.stop();
    this.setWorld();
  }




  /*testLevelRound(levelConfig: ILevelConfig) {

    for (var i = 0; i < levelConfig.cellsLeft; i++) {
      let cell: Cell = this.boardService.getUnusedCell();

      if (cell) {
        cell.isAlive = true;
      } else {
        console.log('no empty cell found');
      }
    }

    this.startGame(true);

    //let goalReached = this.gameEngine.goalReached()
    console.log('GoalReached = ' + this.goalReached);

  }*/

}
