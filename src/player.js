import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";

export class Player {
    constructor(computer) {
        if (computer) {
            this._player_type = 'computer';
        }
        else {
            this._player_type = 'person';
        }

        this._gameBoard = new Gameboard();
    }

    get player_type() {
        return this._player_type;
    }

    get gameBoard() {
        return this._gameBoard;
    }
}