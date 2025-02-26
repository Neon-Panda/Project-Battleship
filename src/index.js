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
        if (cell.isHit && cell.shipPrecent) {
          squareGrid.textContent = "HIT";
        } else if (cell.isHit) {
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
      const dataCoord = event.target.dataset.coord;
      console.log(GameControl.toggle);
      if (dataCoord) {
        let [row, column] = dataCoord.split("-");
        GameControl.toggle
          ? GameControl.attack("playerOne", row, column)
          : GameControl.attack("playerTwo", row, column);
      }

      GameDom.refresh();
      GameControl.turnToggle();
      GameControl.checkForWin();
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
  static toggle = false;

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

  static turnToggle() {
    this.toggle = this.toggle ? false : true;
    return this.toggle;
  }

  static attack(player, row, column) {
    switch (player) {
      case "playerOne":
        GameControl.playerOne.getPlayerBoard().recieveAttack(row, column);
        break;
      case "playerTwo":
        GameControl.playerTwo.getPlayerBoard().recieveAttack(row, column);
        break;
      default:
        break;
    }
  }

  static checkForWin() {
    const playerOneSunk = GameControl.playerOne
      .getPlayerBoard()
      .checkIfAllSunk();
    const playerTwoSunk = GameControl.playerTwo
      .getPlayerBoard()
      .checkIfAllSunk();

    if (playerOneSunk) alert("Player Two has Won!");
    if (playerTwoSunk) alert("Player One has Won!");
  }

  static computerRandomPlace() {
    function ZeroToNine() {
      return Math.floor(Math.random() * 10);
    }
    function ZeroToOne() {
      return Math.floor(Math.random() * 2);
    }
    function direction() {
      return ZeroToOne() === 0 ? "horizontal" : "vertical";
    }
    const computerBoard = this.playerTwo.getPlayerBoard();
    let shipsAvaliable;
    while (!shipsAvaliable) {
      shipsAvaliable = computerBoard
        .getShips()
        .every((ship) => ship.avalible === false);
      computerBoard.placeShip(
        "Carrier",
        ZeroToNine(),
        ZeroToNine(),
        direction()
      );
      computerBoard.placeShip(
        "Battleship",
        ZeroToNine(),
        ZeroToNine(),
        direction()
      );
      computerBoard.placeShip(
        "Cruiser",
        ZeroToNine(),
        ZeroToNine(),
        direction()
      );
      computerBoard.placeShip(
        "Submarine",
        ZeroToNine(),
        ZeroToNine(),
        direction()
      );
      computerBoard.placeShip(
        "Destroyer",
        ZeroToNine(),
        ZeroToNine(),
        direction()
      );
    }
    console.log(computerBoard.getBoard());
  }
}

addEventListener("DOMContentLoaded", () => {
  GameControl.startGame();
  GameControl.computerRandomPlace();
});
