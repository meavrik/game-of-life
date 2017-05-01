export class Cell {
    //isAlive: boolean = false;
    neighbors: Cell[];
    _lifeAround: number = 0;
    _isAlive: boolean = false;
    accupied: boolean = false;
    //nextState: string = "none"
    locked: boolean = false;

    set lifeAround(value) {
        this._lifeAround = value;
    }

    get lifeAround() {
        return this._lifeAround;
    }

    set isAlive(value) {
        this._isAlive = value;
        if (value) this.accupied = true;
    }

    get isAlive() {
        return this._isAlive;
    }

    constructor(public ypos: any, public xpos: any, isAlive: boolean = false) {
        this.isAlive = isAlive;
    }

    toggle() {
        this.isAlive = !this.isAlive;
    }

    updateLifeAround() {
        this.lifeAround = 0;
        this.neighbors.forEach(neighbor => {
            if (neighbor.isAlive) {
                this.lifeAround++;
            }
        })
    }

    liveOrDie() {
        if (this.isAlive) {
            if (this.lifeAround < 2 || this.lifeAround > 3) {
                this.isAlive = false;
            }
        } else if (this.lifeAround == 3) {
            this.isAlive = true;
        }
    }
}