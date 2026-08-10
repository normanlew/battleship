import {Gameboard} from "../src/gameboard.js";
import {Ship} from "../src/ship.js";
import {Player} from "../src/player.js";
import "./styles.css";

const GRID_LENGTH_AND_WIDTH = 600;

let gameBoard = new Gameboard();


let ship = new Ship(4);
gameBoard.placeShip(ship, 5, 9, true);

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
                    // for (let i = 0; i < )
                    
                }
            }
            else {
                // The space does not contain a ship.  Draw the miss icon and change the class to "miss"
                one_square.classList.add("miss");
                one_square.innerHTML = `
                        <svg height=${width_and_height} width=${width_and_height} 
                        xmlns="http://www.w3.org/2000/svg">
                        <circle class="svg-circle" cx=${width_and_height/2} cy=${width_and_height/2} 
                        r="5" fill="black"/>
                        </svg>`
            }
        }
    })

    // one_square.addEventListener("")
    return one_square;
}