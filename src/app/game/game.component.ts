import { LevelsService } from 'app/services/levels.service';
import { Component, OnInit } from '@angular/core';
import { GameEngineService } from "app/services/game-engine.service";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
})
export class GameComponent implements OnInit {
  playing: boolean;

  constructor(public gameEngine: GameEngineService,private levelService:LevelsService) { }

  ngOnInit() {
    //this.reset();
    //this.testLevel(0)
    this.gameEngine.startGame()
  }


  startWorld() {
    this.playing = true;
    this.gameEngine.startWorldLife()
  }

  stop() {
    this.playing = false;
    this.gameEngine.stop()
  }

  tryAgain() {
    this.playing = false;
    this.gameEngine.setWorld();
  }

  nextLevel() {
    this.gameEngine.nextLevel()
  }


}
