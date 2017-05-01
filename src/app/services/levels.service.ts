import { Injectable } from '@angular/core';

export interface IGoal {
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
  isAlive: boolean,
}

export interface IWorldConfig {
  grid: IGrid,
  cellsConfig?: ICellConfig[],
}

export interface ILevelConfig {
  index?: number,
  worldConfig: IWorldConfig
  cellsLeft: number,
  //cellsConfig?: ICellConfig[],
  goal: IGoal,
  //grid: IGrid,
}

@Injectable()
export class LevelsService {
  levels: ILevelConfig[] = [
    {
      worldConfig: {
        cellsConfig: [
          { x: 0, y: 1, isAlive: true },
          { x: 1, y: 1, isAlive: true },
          { x: 2, y: 1, isAlive: true },
        ],
        grid: { rows: 3, columns: 3 },
      },
      cellsLeft: 1,
      goal: { description: `Accupay 50% of the land`, accupie: 5 },

    },
    {
      worldConfig: {
        grid: { rows: 5, columns: 5 },
        cellsConfig: [
          { x: 1, y: 1, isAlive: true },
          { x: 2, y: 1, isAlive: true },
          { x: 1, y: 2, isAlive: true },
        ]
      },
      cellsLeft: 3,
      goal: { description: "Accupay 75% of the land", accupie: 75 },

    },
    {
      worldConfig: {
        grid: { rows: 5, columns: 12 },
        cellsConfig: [
          { x: 1, y: 1, isAlive: true },
          { x: 1, y: 3, isAlive: true }
        ]
      },
      cellsLeft: 4,
      goal: { description: "Accupay 80% of the land", accupie: 80 },

    },
    {
      worldConfig: {
        grid: { rows: 9, columns: 9 },
        cellsConfig: [
          { x: 0, y: 0, isAlive: true },
          { x: 0, y: 8, isAlive: true },
          { x: 8, y: 0, isAlive: true },
          { x: 8, y: 8, isAlive: true },
        ]
      },
      cellsLeft: 4,
      goal: { description: "Survive more than 10 generations", minTurns: 10 },

    },
    //{ grid: { rows: 6, columns: 6 }, index: 4, cellsLeft: 1, goal: { description: "Survive more than 10 generations", minTurns: 5 }, cellsConfig: [] },
  ]


  constructor() {
    this.levels.forEach((item, index) => { item.index = index + 1 })
  }
  testLevel(num: number) {
    let levelConfig = this.levels[num];

    for (var i = 0; i < levelConfig.cellsLeft; i++) {

    }
  }

}
