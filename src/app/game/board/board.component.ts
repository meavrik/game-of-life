import { GameEngineService } from 'app/services/game-engine.service';
import { BoardService } from 'app/services/board.service';
import { Component, OnInit } from '@angular/core';
import { Cell } from "app/cell";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent {

  constructor(private board: BoardService, private gameEngine: GameEngineService) {

  }

  toggle(cell: Cell) {
    if (!cell.locked && (!cell.isAlive && this.gameEngine.cellsLeft > 0 || cell.isAlive)) {
      cell.toggle();

      if (cell.isAlive) {
        this.gameEngine.cellsLeft--;
      } else {
        this.gameEngine.cellsLeft++;
      }
    }

  }

}
