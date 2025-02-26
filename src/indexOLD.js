import "./styles.css";
import { Player } from "./main funtions/player.js";
import { Gameboard } from "./main funtions/gameboard.js";
import { Ship } from "./main funtions/ship.js";

class GameDOM {
  static playerOneGrid = document.querySelector("#player-one-grid");
  static playerTwoGrid = document.querySelector("#player-two-grid");

  static refreshGameCells(PlayerObj) {
    const player = PlayerObj.getType();
    if (player === "Human") {
      this.playerOneGrid.innerHTML = "";
    } else if (player === "Computer") {
      this.playerTwoGrid.innerHTML = "";
    }
    const gameboard = PlayerObj.getPlayerBoard().getBoard();
    gameboard.forEach((row, rowIndex) => {
      row.forEach((square, columnIndex) => {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.coord = rowIndex + "-" + columnIndex;
        cell.innerText = rowIndex + "-" + columnIndex;

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

  static gridEvents(playerObj) {
    const eventTarget =
      playerObj.getType() === "Computer"
        ? this.playerOneGrid
        : this.playerTwoGrid;
    eventTarget.addEventListener(
      "click",
      (event) => {
        const dataAtribute = event.target.dataset.coord.split("-");
        const row = parseInt(dataAtribute[0]);
        const column = parseInt(dataAtribute[1]);

        const playerBoard = playerObj.getPlayerBoard();
        if (playerBoard.getBoard()[row][column].isHit === null) {
          playerBoard.recieveAttack(row, column);
          GameControl.toggleTurn();
        } else GameDOM.gridEvents(playerObj);
      },
      { once: true }
    );
  }
}

class GameControl {
  static PlayerOne;
  static PlayerTwo = new Player("Computer", "Robot");
  static turnToggle = false;
  static currentTurn;

  static startGame() {
    const form = document.querySelector("#name-form");
    const input = document.querySelector("#player-one-name");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = input.value;
      this.PlayerOne = new Player("Human", name);
      this.currentTurn = this.PlayerOne;
      GameDOM.setName(name);
      GameDOM.gridEvents(this.currentTurn);
    });
  }

  static toggleTurn() {
    this.turnToggle = this.turnToggle ? false : true;
    this.turnToggle === false
      ? (this.currentTurn = this.PlayerTwo)
      : (this.currentTurn = this.PlayerOne);
    GameDOM.refreshGameCells(this.currentTurn);
    GameDOM.gridEvents(this.currentTurn);
  }
}

addEventListener("DOMContentLoaded", () => {
  GameDOM.refreshGameCells(GameControl.PlayerTwo);
  GameControl.startGame();
});
