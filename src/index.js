import "./styles.css";
import { Player } from "./main funtions/player.js";

class GameDom {
  static refresh() {
    const playerOneGrid = document.querySelector("#player-one-grid");
    const playerTwoGrid = document.querySelector("#player-two-grid");
    const playerOneBoard = GameControl.playerOne.getPlayerBoard().getBoard();
    const playerTwoBoard = GameControl.playerTwo.getPlayerBoard().getBoard();

    playerOneGrid.innerHTML = "";
    playerTwoGrid.innerHTML = "";

    this.createGrid(playerOneBoard).forEach((square) => {
      playerOneGrid.append(square);
    });
    this.createGrid(playerTwoBoard).forEach((square) => {
      playerTwoGrid.appendChild(square);
    });
  }

  static createGrid(playerBoard) {
    const allSquares = [];
    playerBoard.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("grid-cell");
        squareGrid.dataset.coord = rowIndex + "-" + columnIndex;
        if (cell.isHit) {
          squareGrid.textContent = "X";
        }
        allSquares.push(squareGrid);
      });
    });
    return allSquares;
  }

  static GridEvents() {
    const mainContent = document.querySelector("#main-content");

    mainContent.addEventListener("click", (event) => {
      const player = event.target.parentElement.id;
      const dataCoord = event.target.dataset.coord;
      let row, index;
      switch (player) {
        case "player-one-grid":
          [row, index] = dataCoord.split("-");
          GameControl.playerOne.getPlayerBoard().recieveAttack(row, index);
          break;
        case "player-two-grid":
          [row, index] = dataCoord.split("-");
          GameControl.playerTwo.getPlayerBoard().recieveAttack(row, index);
          break;
        default:
          break;
      }
      GameDom.refresh();
    });
  }

  static setName(name) {
    const form = document.querySelector("#name-form");

    const nameP = document.createElement("p");
    nameP.classList.add("player-header");
    nameP.classList.add("name-label");
    nameP.style.fontSize = "1.5rem";
    nameP.textContent = name;
    form.replaceWith(nameP);
  }
}

class GameControl {
  static playerOne;
  static playerTwo = new Player("Computer", "Robot");
  static currentTurn;

  static startGame() {
    const form = document.querySelector("#name-form");
    const input = document.querySelector("#player-one-name");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.playerOne = new Player("Human", name);
      GameDom.setName(input.value);
      GameDom.refresh();
      GameDom.GridEvents();
    });
  }
}

addEventListener("DOMContentLoaded", () => {
  GameControl.startGame();
});
