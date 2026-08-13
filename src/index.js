import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";
import {Player} from "../src/player.js";
import "./styles.css";

const GRID_LENGTH_AND_WIDTH = 500;

let gameStarted = false;
// let gameIsOver = false;

let player1 = new Player(false);
let player2 = new Player(true);

let gameBoard1 = player1.gameBoard;
let gameBoard2 = player2.gameBoard;


// let ship1 = new Ship(4);
// let ship2 = new Ship(3);
// let ship3 = new Ship(3);
// let ship4 = new Ship(2);
// let ship5 = new Ship(2);
// let ship6 = new Ship(2);
// let ship7 = new Ship(1);
// let ship8 = new Ship(1);
// let ship9 = new Ship(1);
// let ship10 = new Ship(1);

// gameBoard1.placeShip(ship1, 5, 8, true);
// gameBoard1.placeShip(ship2, 0, 9, false);
// gameBoard1.placeShip(ship3, 9, 9, true);
// gameBoard1.placeShip(ship4, 7, 4, false);
// gameBoard1.placeShip(ship5, 7, 9, true);
// gameBoard1.placeShip(ship6, 1, 1, false);
// gameBoard1.placeShip(ship7, 2, 7, true);
// gameBoard1.placeShip(ship8, 9, 2, false);
// gameBoard1.placeShip(ship9, 5, 1, true);
// gameBoard1.placeShip(ship10, 2, 4, false);

toggleShip(player1, "left_board");
toggleShip(player2, "right_board");

// let ship11 = new Ship(4);
// let ship12 = new Ship(3);
// let ship13 = new Ship(3);
// let ship14 = new Ship(2);
// let ship15 = new Ship(2);
// let ship16 = new Ship(2);
// let ship17 = new Ship(1);
// let ship18 = new Ship(1);
// let ship19 = new Ship(1);
// let ship20 = new Ship(1);

// gameBoard2.placeShip(ship11, 0, 9, true);
// gameBoard2.placeShip(ship12, 2, 9, true);
// gameBoard2.placeShip(ship13, 4, 9, true);
// gameBoard2.placeShip(ship14, 6, 9, true);
// gameBoard2.placeShip(ship15, 8, 9, true);
// gameBoard2.placeShip(ship16, 0, 4, true);
// gameBoard2.placeShip(ship17, 2, 4, true);
// gameBoard2.placeShip(ship18, 4, 4, true);
// gameBoard2.placeShip(ship19, 6, 4, true);
// gameBoard2.placeShip(ship20, 8, 4, true);


// createGrid(10, gameBoard1, "left_board");

// createGrid(10, gameBoard2, "right_board");

function createGrid(dimension, gameBoard, grid_div) {
    let square_length_and_width = GRID_LENGTH_AND_WIDTH / dimension;
    const grid = document.querySelector("#" + grid_div);

    for (let j = dimension - 1; j >= 0; j--) {  
        const row = document.createElement("div");
        row.id = "row_" + j;
        row.class = "row";
        row.style.display = "flex";
        for (let i = 0; i < dimension; i++) {
            const square = createSquare(square_length_and_width, i, j, gameBoard, grid_div);
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}

function createSquare(width_and_height, x, y, gameBoard, grid_div) {
    const one_square = document.createElement("div");
    one_square.id = grid_div + String(x) + String(y);
    one_square.classList.add("empty");
    one_square.style.backgroundColor = "rgb(225, 245, 247)";
    one_square.style.width = width_and_height + "px";
    one_square.style.height = width_and_height + "px";
    one_square.style.borderColor = "black"
    one_square.style.borderStyle = "solid"
    one_square.style.borderWidth = ".5px";
    one_square.style.opacity = 1;
    // console.log(one_square.id);

    let ship = gameBoard.getShip(x, y);

    if (grid_div === "left_board") {
        if (ship !== null) {
            one_square.style.backgroundColor = "rgb(237, 176, 170)";
        }
    }

    else {
        one_square.addEventListener("mouseenter", () => {
            if (one_square.classList.contains("empty")) {
                one_square.style.backgroundColor = "rgb(149, 208, 245)";
            }
        })

        one_square.addEventListener("mouseout", () => {
            if (!one_square.classList.contains("hit") && !one_square.classList.contains("sunk")) {
                one_square.style.backgroundColor = "rgb(225, 245, 247)";
            }
        })

        one_square.addEventListener("click", () => {
            if (one_square.classList.contains("empty")) {
                one_square.classList.remove("empty");
                if (gameBoard.hasShip(x, y)) {
                    gameBoard.receiveAttack(x, y);
                    let status = gameBoard.getStatus(x, y);
                    // console.log(status);
                    one_square.innerHTML = `
                        <svg height=${width_and_height} width=${width_and_height}  
                        xmlns="http://www.w3.org/2000/svg">
                            <line x1="0" y1="0" x2=${width_and_height} y2=${width_and_height} style="stroke:red;stroke-width:5" />
                            <line x1="0" y1=${width_and_height} x2=${width_and_height} y2="-0" style="stroke:red;stroke-width:5" />
                            </svg>`
                    one_square.style.backgroundColor = "rgb(237, 176, 170)";
                    if (status === "hit") {
                        // console.log("hit");
                        one_square.classList.add("hit");
                    }
                    else if (status === "sunk") {
                        // console.log("sunk");
                        one_square.classList.add("sunk");
                        

                        // check entire board for spaces that the ship occupies.  For empty spaces that touch the sunk ship, 
                        // fill those in with dots
                        let rows = document.querySelectorAll("#" + grid_div + " > div");

                        for (let i = 0; i < rows.length; i++) {
                            let spaces = rows[i].children;
                            for (let j = 0; j < spaces.length; j++) {
                                let id = spaces[j].id;
                                let x_coordinate = Number(id[id.length - 2]);
                                let y_coordinate = Number(id[id.length - 1]);
                                if (ship === gameBoard.getShip(x_coordinate, y_coordinate)) {
                                    for (let c = x_coordinate - 1; c <= x_coordinate + 1; c++) {
                                        for (let d = y_coordinate - 1; d <= y_coordinate + 1; d++) {
                                            if (gameBoard.receiveAttack(c, d)) {
                                                // console.log(c + " " + d);
                                                let id_square = grid_div + String(c) + String(d)
                                                let adjacent_square = document.querySelector("#" + id_square);
                                                adjacent_square.classList.add("miss");
                                                drawDot(adjacent_square, width_and_height);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                else {
                    // The space does not contain a ship.  Draw the miss icon and change the class to "miss"
                    one_square.classList.add("miss");
                    
                    drawDot(one_square, width_and_height);
                    // one_square.innerHTML = `
                    //         <svg height=${width_and_height} width=${width_and_height} 
                    //         xmlns="http://www.w3.org/2000/svg">
                    //         <circle class="svg-circle" cx=${width_and_height/2} cy=${width_and_height/2} 
                    //         r="5" fill="black"/>
                    //         </svg>`
                }
            }
        })

    }

    // one_square.addEventListener("")
    return one_square;
}

function drawDot(square, width_and_height) {
    square.classList.remove("empty");
    square.innerHTML = `
            <svg height=${width_and_height} width=${width_and_height} 
            xmlns="http://www.w3.org/2000/svg">
            <circle class="svg-circle" cx=${width_and_height/2} cy=${width_and_height/2} 
            r="5" fill="black"/>
            </svg>`
}

function toggleShip(player, grid_div) {
    player.newGameBoard();
    let gameBoard = player.gameBoard;

    let shipArray = [new Ship(4), new Ship(3), new Ship(3), new Ship(2), new Ship(2), new Ship(2),
        new Ship(1), new Ship(1), new Ship(1), new Ship(1)];

    shipArray.forEach((ship) => {
        let isVertical = Math.random() < .5;
        let open = [];
        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                if (gameBoard.canPlaceShip(ship, x, y, isVertical)) {
                    open.push([x, y]);
                }
            }
        }
        // console.log(ship.length);
        
        let space = Math.floor(Math.random() * open.length);
        let coordinates = open[space];
        // console.log(coordinates);

        gameBoard.placeShip(ship, coordinates[0], coordinates[1], isVertical);
    });

    createGrid(10, gameBoard, grid_div);
}