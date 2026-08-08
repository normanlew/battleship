import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";
import {Player} from "../src/player.js";
import "./styles.css";

const GRID_LENGTH_AND_WIDTH = 600;

let gameBoard = new Gameboard();

createGrid(10);

function createGrid(dimension) {
    let square_length_and_width = GRID_LENGTH_AND_WIDTH/dimension;
    const grid = document.querySelector("#gameboard");

    for (let j = dimension - 1; j >= 0; j--) {  
        const row = document.createElement("div");
        row.id = "row_" + j;
        row.style.display = "flex";
        for (let i = 0; i < dimension; i++) {
            const square = createSquare(square_length_and_width, i, j);
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}

function createSquare(width_and_height, x, y) {
    const one_square = document.createElement("div");
    one_square.id = String(x) + String(y);
    one_square.classList.add("empty");
    one_square.style.backgroundColor = "rgb(225, 245, 247)";
    one_square.style.width = width_and_height + "px";
    one_square.style.height = width_and_height + "px";
    one_square.style.borderColor = "black"
    one_square.style.borderStyle = "solid"
    one_square.style.borderWidth = "1px";
    one_square.style.opacity = 1;

    let ship = gameBoard.getShip(x, y);

    one_square.addEventListener("mouseenter", () => {
        if (one_square.classList.contains("empty")) {
            one_square.style.backgroundColor = "rgb(149, 208, 245)";
        }
    })
    return one_square;
}