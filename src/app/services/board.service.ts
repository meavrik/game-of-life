import { GameEngineService } from 'app/services/game-engine.service';
import { Cell } from 'app/cell';
import { Injectable } from '@angular/core';

@Injectable()
export class BoardService {
  cells: Cell[][];
  totalCells:number;
  constructor() { }

  generateNew(rows: number, columns: number) {
    this.totalCells = rows * columns;
    this.cells = [];
    for (var y = 0; y < rows; y++) {
      this.cells[y] = [];
      for (var x = 0; x < columns; x++) {
        this.cells[y][x] = new Cell(y, x);
      }
    }

    this.cells.forEach(row => {
      row.forEach(cell => {
        cell.neighbors = [];
        if (cell.ypos > 0) cell.neighbors.push(this.cells[cell.ypos - 1][cell.xpos]);
        if (cell.ypos < rows - 1) cell.neighbors.push(this.cells[cell.ypos + 1][cell.xpos]);

        if (cell.xpos > 0) cell.neighbors.push(this.cells[cell.ypos][cell.xpos - 1]);
        if (cell.xpos < columns - 1) cell.neighbors.push(this.cells[cell.ypos][cell.xpos + 1]);

        if (cell.ypos > 0 && cell.xpos > 0) cell.neighbors.push(this.cells[cell.ypos - 1][cell.xpos - 1]);
        if (cell.ypos > 0 && cell.xpos < columns - 1) cell.neighbors.push(this.cells[cell.ypos - 1][cell.xpos + 1]);

        if (cell.ypos < rows - 1 && cell.xpos > 0) cell.neighbors.push(this.cells[cell.ypos + 1][cell.xpos - 1]);
        if (cell.ypos < rows - 1 && cell.xpos < columns - 1) cell.neighbors.push(this.cells[cell.ypos + 1][cell.xpos + 1]);
      })
    })
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
        cell.nextGeneration();
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
