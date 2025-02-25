import "./styles.css";
import { Player } from "./main funtions/player.js";
import { Gameboard } from "./main funtions/gameboard.js";
import { Ship } from "./main funtions/ship.js";

const PlayerOne = new Player("Human", "John");

class GridDOM {
  static playerOneGrid = document.querySelector("#player-one-grid");

  static createGameCells(PlayerObj) {
    const gameboard = PlayerObj.getPlayerBoard().getBoard();
    gameboard.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        let cell = document.createElement("div");
        cell.classList.add("grid-cell");
        cell.dataset.coord = `${rowIndex}-${columnIndex}`;
        cell.textContent = `${rowIndex}-${columnIndex}`;
        this.playerOneGrid.appendChild(cell);
      });
    });
  }
}

// GridDOM.createGameCells(PlayerOne);
