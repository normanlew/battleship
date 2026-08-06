import {Ship} from "../src/ship.js";

describe('test ship with no hits', () => {
    let ship;

    beforeEach(() => {
        ship = new Ship(3);
    })


    test('ship is length 3', () => {
        expect(ship.length).toBe(3);
    });

    test('number of hits is 0', () => {
        expect(ship.hits).toBe(0);
    })

    test('ship is sunk is false', () => {
        expect(ship.isSunk()).toBeFalsy();
    })
});


describe('test ship with hits', () => {
    let ship2;
    beforeEach(() => {
        ship2 = new Ship(3);
        ship2.hit();
        ship2.hit();
    })


    test('number of hits is 2', () => {
        expect(ship2.hits).toBe(2);
    })

    test('ship is sunk is false', () => {
        expect(ship2.isSunk()).toBeFalsy();
    })
});

describe('test ship that is sunk', () => {
    let ship3;
    beforeEach(() => {
        ship3 = new Ship(3);
        ship3.hit();
        ship3.hit();
        ship3.hit();
    })

    test('number of hits is 3', () => {
        expect(ship3.hits).toBe(3);
    })

    test('ship is sunk is true', () => {
        expect(ship3.isSunk()).toBeTruthy();
    })
});

