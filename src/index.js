import "./styles.css";
import { Player } from "./main funtions/player.js";
import { Gameboard } from "./main funtions/gameboard.js";
import { Ship } from "./main funtions/ship.js";

const PlayerOne = new Player("Human", "John");
const PlayerTwo = new Player("Computer", "TEST");

class GameDOM {
  static playerOneGrid = document.querySelector("#player-one-grid");
  static playerTwoGrid = document.querySelector("#player-two-grid");

  static refreshGameCells(PlayerObj) {
    const gameboard = PlayerObj.getPlayerBoard().getBoard();
    gameboard.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.coord = rowIndex + "-" + columnIndex;

        if (square.isHit && square.shipPrecent) {
          cell.textContent = "*";
          cell.classList.add("ship-precent");
        } else if (square.isHit) {
          cell.textContent = "*";
          cell.classList.add("no-ship");
        }

        const playerType = PlayerObj.getType();
        playerType === "Human"
          ? this.playerOneGrid.appendChild(cell)
          : this.playerTwoGrid.appendChild(cell);
      });
    });
  }

  static setName(name) {
    const form = document.querySelector("#name-form");

    const namePara = document.createElement("p");
    namePara.classList.add("player-header");
    namePara.classList.add("name-label");
    namePara.style.fontSize = "1.5rem";
    namePara.textContent = name;
    form.replaceWith(namePara);
  }

  static gridEvents(player) {
    const turn = player === "Human" ? this.playerOneGrid : this.playerTwoGrid;

    turn.addEventListener(
      "click",
      (event) => {
        const dataAtribute = event.target.dataset.coord.split("-");
        const row = parseInt(dataAtribute[0]);
        const column = parseInt(dataAtribute[1]);
        player.getPlayerBoard().recieveAttack(row, column);
      },
      { once: true }
    );
  }
}

function startGame() {
  const form = document.querySelector("#name-form");
  const input = document.querySelector("#player-one-name");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value;
    input.value = "";
    GameDOM.setName(name);
  });
}

addEventListener("DOMContentLoaded", () => {
  GameDOM.refreshGameCells(PlayerTwo);
  GameDOM.gridEvents(PlayerOne);
  startGame();
});
