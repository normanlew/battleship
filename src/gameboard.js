export class Gameboard {
    constructor() {
        this._board = Array.from({length: 10}, () => Array(10).fill({ship: null, status: "empty"}));
    }

    placeShip(ship, x, y, isVertical) {
        let ship_length = ship.length;
        // let spaceIsClear = true;

        if (isVertical) {
            // Check to make sure the ship's coordinates are all within the board
            if (x < 0 || x >= this._board.length || y > this._board[0].length || y + 1 - ship_length < 0) {
                return false;
            }
            else {
                // Check to make sure that the ship won't be touching another ship already on the board,
                // and, check to make sure the requested space for the ship isn't already occupied
                for (let i = y + 1; i >= y - ship_length && i < this._board[0].length &&
                        i >= 0; i--) {
                    
                    for (let j = x - 1; j >= 0 && j < ship_length && j <= x + 1; j++) {
                        if (this._board[x, y].ship !== null) {
                            return false;
                        }
                    }
                }
            }
            // The area is clear to place the ship
            for (let i = y; i > y - ship_length; i--) {
                this._board[x, y]. ship = ship;
            }

        }
        else {
            // Check to make sure the ship's coordinates are all within the board
            if (y < 0 || y >= this._board[0].length || x < 0 || x + ship.length - 1 >= this._board.length) {
                return false;
            }
            else {
                // Check to make sure that the ship won't be touching another ship already on the board,
                // and, check to make sure the requested space for the ship isn't already occupied
                for (let i = x - 1; i >= 0 && i < this._board.length && i <= x + ship.length; i++) {
                    for (let j = y + 1; j >= y - 1 && j < this._board[0].length && j >= 0  ; j--) {
                        if (this._board[y, y].ship !== null) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
}