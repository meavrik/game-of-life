import { IWorldConfig, IGoal, ILevelConfig } from './../services/levels.service';
import { IBoard, BoardService } from './../services/board.service';

export class World {

    generation: number = 0;
    //accupied: number;
    board: IBoard
    //lives: number = 0;
    running: boolean;
    timeout;
    goal: IGoal;
    goalReached: boolean;

    constructor(private boardService: BoardService) {

    }

    init(worldConfig: ILevelConfig) {
        this.board = this.boardService.generateNew(worldConfig.worldConfig);
        this.goal = worldConfig.goal;
    }

    startLife() {
        console.log('start Life');
        this.running = true;
        this.generation = 0;
        this.nextGeneration();
    }

    nextGeneration() {
        this.generation++;
        console.log('Generation ' + this.generation);

        this.board.cells.forEach(row => {
            row.forEach(cell => {
                cell.updateLifeAround();
            })
        })

        if (this.lives) {
            this.chkForGoalReached();

            if (this.goalReached) {
                console.log('GOAL REACHED');
            }
            this.timeout = setTimeout(() => { this.nextGeneration(); }, 600);
        } else {
            this.stopLife();
            console.log('no more life in this world');

        }
    }

    chkForGoalReached() {

        if (this.goal.accupie && this.accupied >= this.goal.accupie) {
            //return true;
            this.goalReached = true;
        }

        if (this.goal.minTurns && this.generation >= this.goal.minTurns) {
            //return true;
            this.goalReached = true;
        }

        //return false;
    }

    stopLife() {
        this.running = false;
        clearTimeout(this.timeout);
    }


    get accupiedPercent(): string {
        let totalCells = this.board.cells.length * this.board.cells[0].length;
        let accupied = this.accupied ? (this.accupied / totalCells) * 100 : 0;

        return accupied.toFixed() + "%";
    }

    get lives(): number {
        let lives: number = 0;
        this.board.cells.forEach(row => {
            row.forEach(cell => {
                cell.liveOrDie();
                if (cell.isAlive) {
                    lives++;
                }
            })
        });

        return lives;
    }

    get accupied(): number {
        let num = 0;
        this.board.cells.forEach(row => {
            row.forEach(cell => {
                if (cell.accupied) {
                    num++;
                }
            })

        });

        return num;
    }

}