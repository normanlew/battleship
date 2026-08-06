import { experiments } from "webpack";
import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";

let gameBoard;
// let board;
// let ship;

 beforeEach(() => {
    gameBoard = new Gameboard();
    // board = gameBoard.board;
});

// test('gameBoard spaces should not be equal', () => {
//     expect(board[0][0] === board[0][1]).toBeFalsy();
// })


describe('vertical ship placements on empty board', () => {
    let ship1;
    // let ship2;

    beforeEach(() => {
        ship1 = new Ship(1);
        // ship2 = new Ship(2);
    });

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship1, 0, 0, true)).toBeTruthy();
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship1, -1, 0, true)).toBeFalsy();
    });
    
});

describe('vertical ship placements with ships already on the board', () => {
    let ship1;
    let ship2;

    beforeEach(() => {
        ship1 = new Ship(4);
        ship2 = new Ship(3);

        gameBoard.placeShip(ship1, 4, 8, true);
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 4, 8, true)).toBeFalsy();
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 5, 8, true)).toBeFalsy();
    })

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship2, 6, 5, true)).toBeTruthy();
    })
});

describe('horizontal ship placements on empty board', () => {
    let ship1;
    // let ship2;

    beforeEach(() => {
        ship1 = new Ship(1);
        // ship2 = new Ship(2);
    });

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship1, 0, 0, false)).toBeTruthy();
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship1, 0, 20, false)).toBeFalsy();
    });
    
});

describe('horizontal ship placements with ships already on the board', () => {
    let ship1;
    let ship2;

    beforeEach(() => {
        ship1 = new Ship(4);
        ship2 = new Ship(3);

        gameBoard.placeShip(ship1, 0, 6, false);
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 4, 5, false)).toBeFalsy();
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 1, 7, false)).toBeFalsy();
    })

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship2, 2, 4, false)).toBeTruthy();
    })
});

describe('attack functionality on empty spaces on the board', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);

        gameBoard.placeShip(ship, 5, 7, true);
    });

    test('attack on empty space should be true', () => {
        expect(gameBoard.receiveAttack(1, 4)).toBeTruthy();
    });

    test('attack on empty space should be true', () => {
        expect(gameBoard.receiveAttack(5, 7)).toBeTruthy();
    });
});

describe('attack functionality on non-empty spaces on the board', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
        gameBoard.placeShip(ship, 5, 7, true);

        gameBoard.receiveAttack(5, 6);
        gameBoard.receiveAttack(1, 2)
    });

    test('attack on non-empty space should be false', () => {
        expect(gameBoard.receiveAttack(5, 6)).toBeFalsy();
    });

    test('attack on non-empty space should be false', () => {
        expect(gameBoard.receiveAttack(1, 2)).toBeFalsy();
    });
});

describe('check ship sunk status after sustaining enough hits to be sunk', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
        gameBoard.placeShip(ship, 4, 5, true);
        gameBoard.receiveAttack(4, 5);
        gameBoard.receiveAttack(4, 4);
        gameBoard.receiveAttack(4, 3);
    });

    test('ship status should be sunk', () => {
        expect(ship.isSunk()).toBeTruthy();
    });
});

describe('board with unsunk ships should report that not all ships have been sunk', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(4);
        gameBoard.placeShip(ship, 2, 3, false);
        gameBoard.receiveAttack(2, 3);
        gameBoard.receiveAttack(2, 4);
        // console.log(ship.isSunk());
    });

    test('call to allSunk should return false', () => {
        expect(gameBoard.allSunk()).toBeFalsy();
    });
});

describe('board with all ships sunk should report that all ships have been sunk', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
        gameBoard.placeShip(ship, 4, 5, true);
        gameBoard.receiveAttack(4, 5);
        gameBoard.receiveAttack(4, 4);
        gameBoard.receiveAttack(4, 3);
        console.log(ship.isSunk());
    });

    test('call to allSunk should return true', () => {
        expect(gameBoard.allSunk()).toBeTruthy();
    });
});

