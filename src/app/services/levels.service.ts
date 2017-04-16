import { Injectable } from '@angular/core';

interface IGoal {
  description: string,
  accupie?: number,
  minTurns?: number
}

interface IGrid {
  rows: number,
  columns: number,
}
interface ICellConfig {
  x: number,
  y: number,
  isAlive: boolean
}

export interface ILevelConfig {
  index: number,
  cells: number,
  cellsConfig: ICellConfig[],
  goal: IGoal,
  grid: IGrid,
}

@Injectable()
export class LevelsService {
  levels: ILevelConfig[] = [
    {
      grid: { rows: 5, columns: 5 },
      index: 1,
      cells: 3,
      goal: { description: "Accupay 75% of the land", accupie: 75 },
      cellsConfig: [
        { x: 1, y: 1, isAlive: true },
        { x: 2, y: 1, isAlive: true },
        { x: 1, y: 2, isAlive: true },
      ]
    },
    { grid: { rows: 5, columns: 12 }, 
      index: 2,
      cells: 4, 
      goal: { description: "Accupay 80% of the land", accupie: 80 }, 
      cellsConfig: [
        { x: 1, y: 1, isAlive: true },
        { x: 1, y: 3, isAlive: true }
        ] 
    },
    { 
        grid: { rows: 9, columns: 9 }, 
        index: 3, 
        cells: 4, 
        goal: { description: "Survive more than 10 generations", minTurns: 10 }, 
        cellsConfig: [
          { x: 0, y: 0, isAlive: true },
          { x: 0, y: 8, isAlive: true },
          { x: 8, y: 0, isAlive: true },
          { x: 8, y: 8, isAlive: true },
        ] 
      },
    { grid: { rows: 6, columns: 6 }, index: 4, cells: 1, goal: { description: "Survive more than 10 generations", minTurns: 5 }, cellsConfig: [] },
  ]

  constructor() {

  }

}
