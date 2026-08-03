import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";

let gameBoard;
// let ship;

beforeAll(() => {
    gameBoard = new Gameboard();
    // ship = new Ship();
});

describe('ship placements on empty board', () => {
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

describe('ship placements with ships on board', () => {
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

