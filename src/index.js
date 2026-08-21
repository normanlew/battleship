import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";
import {Player} from "../src/player.js";
// import { waitUntil, WAIT_FOREVER } from 'async-wait-until';
import "./styles.css";

const GRID_LENGTH_AND_WIDTH = 500;

let gameStarted = false;
let player1Moved = false;
let player2Moved = false;
// let gameIsOver = false;

let player1 = new Player(false);
let player2 = new Player(true);

let player1Turn = Math.random() < .5;
// let player1Turn = true;;

let gameBoard1 = player1.gameBoard;
let gameBoard2 = player2.gameBoard;

let toggle_button = document.querySelector("#toggle");
toggle_button.addEventListener("click", (e) => {
    toggleShip(player1, "left_board");
});

let start_button = document.querySelector("#start");
start_button.addEventListener("click", (e) => {
    // let messages = document.querySelector("#bottom_right");
    if (!gameStarted) {
        // console.log("game starting");
        gameStarted = true;
        toggle_button.style.backgroundColor = "rgba(20, 20, 17, 0.851)"
        toggle_button.disabled = true;
        start_button.disabled = true;

        playGame();
        // let player1Turn = Math.random() < .5;

        // let p = document.createElement("p");
        // p.innerHTML = "Your move";
        // messages.appendChild(p);
        // while (gameStarted) {
        //     messages.replaceChildren();
        //     if (player1Turn) {
        //         console.log("player1 turn");
        //         // player1Moved = false;
        //         // player1Turn = false;
        //         let p = document.createElement("p");
        //         p.innerHTML = "Your move";
        //         messages.appendChild(p);

        //         // waitForClickSequence();

        //     }
        //     else {
        //         console.log("player2 turn");
        //     }
        // }
    }
});

async function playGame() {
    let gameBoard1 = player1.gameBoard;
    let gameBoard2 = player2.gameBoard;
    // console.log("in playGame");
    // let counter = 100;
    // let movesLeftInRound = 1;
    // 
    let messages = document.querySelector("#bottom_right");
    // p.innerHTML = "Your move";
    // messages.appendChild(p);
    // console.log("gameBoard1.allSunk(): " + gameBoard1.allSunk() + ", gameBoard2.allSunk(): " + gameBoard2.allSunk());
    while (!gameBoard1.allSunk() && !gameBoard2.allSunk()) {
            // while (true) {

        // console.log("neither board has all sunk ships");
        // console.log("counter: " + counter + ", move left in round: " + movesLeftInRound);
        messages.replaceChildren();
        if (player1Turn) {
            for (let x = 0; x < 10; x++) {
                    // console.log("XXXX");
                for (let y = 0; y < 10; y++) {
                    // console.log("in disallow click loop");
                    let square = document.getElementById("right_board" + String(x) + String(y));
                    // console.log(square);
                    square.style.pointerEvents = 'auto';
                }
            }
            // console.log("player1 turn");
            // player1Moved = false;
            // player1Turn = false;
            let p = document.createElement("p");
            p.innerHTML = "Your move";
            messages.appendChild(p);
            await waitForClick("right_board");
            // console.log("click player 1")
            // console.log(event.target.classList);
            // if (event.target.classList.contains("empty")) {
            //     console.log("switcing to player1");
            //     player1Turn = true;
            // }

            // await waitForClick("left_board");

            // waitForClickSequence();

        }
        else {
            // console.log("player 2's turn");
            for (let x = 0; x < 10; x++) {
                // console.log("XXXX");
                for (let y = 0; y < 10; y++) {
                    // console.log("in disallow click loop");
                    let square = document.getElementById("right_board" + String(x) + String(y));
                    // console.log(square);
                    square.style.pointerEvents = 'none';
                }
            }

            // player 2's turn

            // get the number of blank spaces on player 1's board
            let emptySpaces = 0;
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    let square = document.getElementById("left_board" + String(x) + String(y));
                    if (square.classList.contains("empty")) {
                        emptySpaces++;
                    }
                }
            }
            // console.log("emptySpaces: " + emptySpaces);
            // console.log("player2 turn");
            let p = document.createElement("p");
            p.innerHTML = "Computer's move";
            messages.appendChild(p);

            await setTimeout(() => {
                let index = Math.floor(Math.random() * emptySpaces);
                // console.log("setTimeout index: " + index);
                let square = getSquareAtNumber(index);
                // console.log(square);
                square.click();
                // player1Turn = true;
            }, 3000);
            await waitForClick("left_board");
            player1Turn = true;
            // counter++;
            // let event = await waitForClick("right_board");
            // console.log("click!")
            // if (event.target.classList.contains("empty")) {
            //     console.log("switcing to player1");
            //     player1Turn = true;
            // }
        }

        if (gameBoard1.allSunk() || gameBoard2.allSunk()) {
            for (let x = 0; x < 10; x++) {
                for (let y = 0; y < 10; y++) {
                    let square = document.getElementById("right_board" + String(x) + String(y));
                    let cloneSquare = square.cloneNode(true);
                    square.parentNode.replaceChild(cloneSquare, square);
                }
            }
            if (gameBoard1.allSunk()) {
                messages.replaceChildren();
                let p = document.createElement("p");
                p.innerHTML = "The game is over.  Computer has won.";
                messages.appendChild(p);
            }
            else if (gameBoard2.allSunk()) {
                messages.replaceChildren();
                let p = document.createElement("p");
                p.innerHTML = "The game is over.  You have won.";
                messages.appendChild(p);
            }
        }

        

        // if (movesLeftInRound === 0) {
        //     movesLeftInRound = 1;
        //     counter--;
        // }
        // else {
        //     movesLeftInRound--;
        // }
    }
}

toggleShip(player1, "left_board");
toggleShip(player2, "right_board");


function createGrid(dimension, gameBoard, grid_div) {
    let square_length_and_width = GRID_LENGTH_AND_WIDTH / dimension;
    const grid = document.querySelector("#" + grid_div);
    grid.replaceChildren();

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

        one_square.addEventListener("click", () => {
            if (one_square.classList.contains("empty")) {
                one_square.classList.remove("empty");
                player1Turn = false;
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

                        // Place dots on squares diagnol to this hit
                        let diagnol = [[x + 1, y + 1], [x + 1, y - 1], [x - 1, y - 1], [x - 1, y + 1]];

                        diagnol.forEach((item) => {
                            if (gameBoard.receiveAttack(item[0], item[1])) {
                                let diagnolSquare = document.getElementById(grid_div + String(item[0] + String(item[1])));
                                drawDot(diagnolSquare, width_and_height);
                            }
                        });
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
        // else {
        //     one_square.addEventListener("mouseenter", () => {
        //         if (one_square.classList.contains("empty")) {
        //             one_square.style.backgroundColor = "rgb(149, 208, 245)";
        //         }
        //     });        
        // }

        // one_square.addEventListener("mouseenter", () => {
        //     if (one_square.classList.contains("empty") && ship == null) {
        //         one_square.style.backgroundColor = "rgb(149, 208, 245)";
        //     }
        // })
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
                player1Turn = false;
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

                        // Place dots on squares diagnol to this hit
                        let diagnol = [[x + 1, y + 1], [x + 1, y - 1], [x - 1, y - 1], [x - 1, y + 1]];

                        diagnol.forEach((item) => {
                            if (gameBoard.receiveAttack(item[0], item[1])) {
                                let diagnolSquare = document.getElementById(grid_div + String(item[0] + String(item[1])));
                                drawDot(diagnolSquare, width_and_height);
                            }
                        });
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

function waitForClick(elementId) {
    return new Promise ((resolve) => {
        const element = document.getElementById(elementId);

        element.addEventListener('click', resolve, {once: true});
    });
}

// async function waitForClickSequence() {
//     await waitForClick("right_board");
// }

function getSquareAtNumber(number) {
    // console.log("number: " + number);
    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            // console.log("x: " + x + ", y: " + y);
            let square = document.getElementById("left_board" + x + y);
            // console.log(square);
            if (square.classList.contains("empty")) {
                if (number === 0) {
                    return square;
                }
                else {
                    number--;
                    continue;
                }
            }
        }
    }
    return null;
}

for (let x = 0; x < 10; x++) {
    // console.log("XXXX");
    for (let y = 0; y < 10; y++) {
        // console.log("in disallow click loop");
        let square = document.getElementById("right_board" + String(x) + String(y));
        // console.log(square);
        square.style.pointerEvents = 'none';
    }
}