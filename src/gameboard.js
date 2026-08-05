export class Gameboard {
    constructor() {
        this._board = Array.from({length: 10}, () => Array(10).fill({ship: null, status: "empty"}));
        // possible status values should be: empty, hit, miss, sunk
    }

    placeShip(ship, x, y, isVertical) {
        let ship_length = ship.length;
        // let spaceIsClear = true;

        if (isVertical) {
            // Check to make sure the ship's coordinates are all within the board
            if (x < 0 || x >= this._board.length || y >= this._board[0].length || y + 1 - ship_length < 0) {
                return false;
            }
            else {
                // Check to make sure that the ship won't be touching another ship already on the board,
                // and, check to make sure the requested space for the ship isn't already occupied
                for (let i = y + 1; i >= y - ship_length && i < this._board[0].length &&
                        i >= 0; i--) {
                    
                    for (let j = x - 1; j >= 0 && j < this._board.length && j <= x + 1; j++) {
                        if (this._board[j][i].ship !== null) {
                            return false;
                        }
                    }
                }
            }
            // The area is clear to place the ship
            for (let i = y; i > y - ship_length; i--) {
                this._board[x][i].ship = ship;
                // console.log("x: " + x + ", y: " + i);
                // console.log(this._board[x][i].ship)
            }

        }
        // ship placement is horizontal
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
                        if (this._board[i][j].ship !== null) {
                            return false;
                        }
                    }
                }
            }
            // The area is clear to place the ship
            for (let i = x; i < x + ship_length; i++) {
                this._board[i][y].ship = ship;
            }
        }
        return true;
    }

    // Gameboards should have a receiveAttack function that takes a pair of 
    // coordinates, determines whether or not the attack hit a ship and then 
    // sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
    receiveAttack(x, y) {
        // returning true means the attack was on an empty space.
        // returning false means the attack was on a space already attacked
        // console.log("x: " + x + ", y: " + y);
        let space = this._board[x][y];
        // console.log(space);
        if (space.status === "empty") {
            // console.log(x + ', ' + y + " is empty")
            if (space.ship !== null) {
                space.ship.hit();
                if (space.ship.isSunk()) {
                    space.status = "sunk";
                }
                else {
                    space.status = "hit";
                }
            }
            else {
                space.status = "miss";
            }
            return true;
        }
        else {
            return false;
        }
    }
}