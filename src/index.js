import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";
import {Player} from "../src/player.js";

const GRID_LENGTH_AND_WIDTH = 600;


createGrid(10);

function createGrid(dimension) {
    let square_length_and_width = GRID_LENGTH_AND_WIDTH/dimension;
    const grid = document.querySelector("#gameboard");

    for (let j = dimension - 1; j >= 0; j--) {  
        const row = document.createElement("div");
        row.id = "row_" + j;
        row.style.display = "flex";
        for (let i = 0; i < dimension; i++) {
            const square = createSquare(square_length_and_width, String(i) + String(j));
            row.appendChild(square);
        }
        grid.appendChild(row);
    }
}

function createSquare(width_and_height, square_id) {
    const one_square = document.createElement("div");
    one_square.id = square_id;
    one_square.style.backgroundColor = "yellow";
    one_square.style.width = width_and_height + "px";
    one_square.style.height = width_and_height + "px";
    one_square.style.opacity = 1;

    one_square.addEventListener("mouseenter", () => {
        if (one_square.style.backgroundColor === "yellow") {
            one_square.style.backgroundColor = "purple";
            one_square.style.opacity = .1;
        }
        else {
            if (one_square.style.opacity < 1) {
                one_square.style.opacity = Number(one_square.style.opacity) + .1;
            }
        }
    })
    return one_square;
}