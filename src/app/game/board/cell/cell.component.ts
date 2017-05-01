import { BoardService } from 'app/services/board.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
})
export class CellComponent implements OnInit {

  @Input() xpos:number;
  @Input() ypos:number;
  @Input() isAlive: boolean = false;
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

}
