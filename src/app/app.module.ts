import { GameEngineService } from './services/game-engine.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { BoardComponent } from './game/board/board.component';
import { BoardService } from "app/services/board.service";
import { CellComponent } from './game/board/cell/cell.component';
import { LevelsService } from "app/services/levels.service";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    BoardComponent,
    CellComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [GameEngineService,BoardService, LevelsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
