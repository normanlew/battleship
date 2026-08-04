import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";

let gameBoard;
// let ship;

beforeAll(() => {
    gameBoard = new Gameboard();
    // ship = new Ship();
});

describe('vertical ship placements on empty board', () => {
    let ship1;
    // let ship2;

    beforeAll(() => {
        ship1 = new Ship(1);
        // ship2 = new Ship(2);
    });

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship1, 0, 0, true)).toBeTruthy;
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship1, -1, 0, true)).toBeFalsy;
    });
    
});

describe('vertical ship placements with ships already on the board', () => {
    let ship1;
    let ship2;

    beforeAll(() => {
        ship1 = new Ship(4);
        ship2 = new Ship(3);

        gameBoard.placeShip(ship1, 4, 8, true);
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 4, 8, true)).toBeFalsy;
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 5, 8, true)).toBeFalsy;
    })

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship2, 6, 5, true)).toBeTrue;
    })
})

describe('horizontal ship placements on empty board', () => {
    let ship1;
    // let ship2;

    beforeAll(() => {
        ship1 = new Ship(1);
        // ship2 = new Ship(2);
    });

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship1, 0, 0, false)).toBeTruthy;
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship1, 0, 20, false)).toBeFalsy;
    });
    
});

describe('horizontal ship placements with ships already on the board', () => {
    let ship1;
    let ship2;

    beforeAll(() => {
        ship1 = new Ship(4);
        ship2 = new Ship(3);

        gameBoard.placeShip(ship1, 0, 6, true);
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 4, 5, false)).toBeFalsy;
    });

    test('ship placement is unsuccessful', () => {
        expect(gameBoard.placeShip(ship2, 1, 7, true)).toBeFalsy;
    })

    test('ship placement is successful', () => {
        expect(gameBoard.placeShip(ship2, 2, 4, true)).toBeTrue;
    })

    
})

