import { BoardService } from 'app/services/board.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
})
export class CellComponent implements OnInit {

  isAlive: boolean = false;
  //neighbors: Cell[];

  constructor(private board:BoardService) 
  { 

  }

  ngOnInit() {
  }

  toggle() {
      this.isAlive = !this.isAlive;
      console.log(this.isAlive);
  }

  lives() {
      this.isAlive = true;
  }

  dies() {
      this.isAlive = false;
  }

  /*getAliveNeighbors(board) {
      var y = this.position.y;
      var x = this.position.x;
      var prevRow = board[y - 1] || [];
      var nextRow = board[y + 1] || [];
      var neighbors = [
          prevRow[x - 1], prevRow[x], prevRow[x + 1],
          board[y][x - 1], board[y][x + 1],
          nextRow[x - 1], nextRow[x], nextRow[x + 1],
      ];
      return neighbors.reduce(function (prev, curr) {
          if (curr) {
              return prev += +!!curr.isAlive;
          }
          return prev += 0;
      }, 0);
  }*/
  

}
