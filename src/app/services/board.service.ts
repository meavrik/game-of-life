import { IWorldConfig } from './levels.service';
import { GameEngineService } from 'app/services/game-engine.service';
import { Cell } from 'app/cell';
import { Injectable } from '@angular/core';


export interface IBoard {
  cells: Cell[][];
}

@Injectable()
export class BoardService {
  cells: Cell[][];
  totalCells: number;
  
  //generateNew(rows: number, columns: number): IBoard {
  generateNew(worldConfig:IWorldConfig): IBoard {
    let rows = worldConfig.grid.rows;
    let columns = worldConfig.grid.columns;
    
    this.totalCells = rows * columns;
    let cells: Cell[][] = [];
    for (var y = 0; y < rows; y++) {
      cells[y] = [];
      for (var x = 0; x < columns; x++) {
        cells[y][x] = new Cell(y, x);
      }
    }

    cells.forEach(row => {
      row.forEach(cell => {
        cell.neighbors = [];
        if (cell.ypos > 0) cell.neighbors.push(cells[cell.ypos - 1][cell.xpos]);
        if (cell.ypos < rows - 1) cell.neighbors.push(cells[cell.ypos + 1][cell.xpos]);

        if (cell.xpos > 0) cell.neighbors.push(cells[cell.ypos][cell.xpos - 1]);
        if (cell.xpos < columns - 1) cell.neighbors.push(cells[cell.ypos][cell.xpos + 1]);

        if (cell.ypos > 0 && cell.xpos > 0) cell.neighbors.push(cells[cell.ypos - 1][cell.xpos - 1]);
        if (cell.ypos > 0 && cell.xpos < columns - 1) cell.neighbors.push(cells[cell.ypos - 1][cell.xpos + 1]);

        if (cell.ypos < rows - 1 && cell.xpos > 0) cell.neighbors.push(cells[cell.ypos + 1][cell.xpos - 1]);
        if (cell.ypos < rows - 1 && cell.xpos < columns - 1) cell.neighbors.push(cells[cell.ypos + 1][cell.xpos + 1]);
      })
    })



    worldConfig.cellsConfig.forEach(cell => {
      //this.setCellPosition(cell.x, cell.y, cell.isAlive)
      cells[cell.y][cell.x].isAlive = cell.isAlive;
     // if (lock) {
      cells[cell.y][cell.x].locked = true;
     // }
    })


    this.cells = cells;
    return { cells: cells }
  }

  setCellPosition(x: number, y: number, isAlive: boolean, lock: boolean = true) {
    this.cells[y][x].isAlive = isAlive;
    if (lock) {
      this.cells[y][x].locked = true;
    }
  }

  nextGeneration(): number {
    let lives: number = 0;

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.updateLifeAround();
      })
    })

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.liveOrDie();
        if (cell.isAlive) {
          lives++;
        }
      })
    })

    console.log('lives = ' + lives);
    return lives;
  }


  getUnusedCell(): Cell {

    let cell: Cell;

    do {
      let randomRow: number = Math.floor(Math.random() * this.cells.length);
      let randomColumn: number = Math.floor(Math.random() * this.cells[randomRow].length);

      cell = this.cells[randomRow][randomColumn];
    } while (cell.isAlive);

    return cell;
  }

  get accupied(): number {
    let num = 0;
    this.cells.forEach(row => {
      row.forEach(cell => {
        if (cell.accupied) {
          num++;
        }
      })

    });

    return num;
  }



}
