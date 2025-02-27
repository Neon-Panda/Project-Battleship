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

    this.createGrid(playerOneBoard, "Human").forEach((square) => {
      playerOneGrid.append(square);
    });
    this.createGrid(playerTwoBoard, "Computer").forEach((square) => {
      playerTwoGrid.appendChild(square);
    });
    GameDom.dragShips();
  }

  static createGrid(playerBoard, player) {
    const allSquares = [];
    playerBoard.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const squareGrid = document.createElement("div");
        squareGrid.classList.add("grid-cell");
        squareGrid.id = "grid-cell";
        squareGrid.dataset.coord = rowIndex + "-" + columnIndex;
        if (player === "Human" && cell.shipPrecent) {
          squareGrid.innerText = "O";
        }
        if (cell.isHit && cell.shipPrecent) {
          squareGrid.textContent = "HIT";
          squareGrid.classList.add("square-ship");
        } else if (cell.isHit) {
          squareGrid.textContent = "X";
          squareGrid.classList.add("square-hit");
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
      const currentPlayer = event.target.parentElement.id;
      const turn = GameControl.currentTurn;
      let row, column;
      if (
        dataCoord &&
        currentPlayer === "player-one-grid" &&
        turn === "playerOne"
      ) {
        [row, column] = dataCoord.split("-");
        GameControl.attack("playerOne", row, column);
        GameControl.turnToggle();
      } else if (
        dataCoord &&
        currentPlayer === "player-two-grid" &&
        turn === "playerTwo"
      ) {
        [row, column] = dataCoord.split("-");
        GameControl.attack("playerTwo", row, column);
        GameControl.turnToggle();
      }
      GameDom.refresh();
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

  static directionButton() {
    const direcitonBtn = document.querySelector("#direction-btn");
    direcitonBtn.addEventListener("click", (event) => {
      GameControl.directionToggle();
      direcitonBtn.innerText = GameControl.currentDirection;
    });
  }

  static dragShips() {
    const ships = document.querySelectorAll("[data-ship]");
    const playerOneGrid = document.querySelectorAll(
      "#player-one-grid > #grid-cell"
    );
    for (let ship of ships) {
      ship.addEventListener("dragstart", (event) => {
        const shipName = event.target.id;
        playerOneGrid.forEach((square) => {
          square.addEventListener("dragover", (event) => {
            event.preventDefault();
          });
          square.addEventListener("drop", (event) => {
            const square = event.target.dataset.coord;
            let [row, column] = event.target.dataset.coord.split("-");
            GameControl.playerOne
              .getPlayerBoard()
              .placeShip(
                shipName,
                parseInt(row),
                parseInt(column),
                GameControl.currentDirection
              );
            GameDom.refresh();
          });
        });
      });
    }
  }
}

class GameControl {
  static playerOne = new Player("Human", "name");
  static playerTwo = new Player("Computer", "Robot");
  static toggleTurn = false;
  static currentTurn = "playerTwo";
  static directionBolean = false;
  static currentDirection;

  static startGame() {
    const form = document.querySelector("#name-form");
    const input = document.querySelector("#player-one-name");

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (GameControl.getAllShipsUsed(this.playerOne)) {
        const name = input.value;
        GameControl.playerOne.setName(name);
        GameDom.setName(name);
        GameDom.GridEvents();
      }
    });
  }

  static turnToggle() {
    this.toggleTurn = this.toggleTurn ? false : true;
    this.currentTurn = this.toggleTurn === true ? "playerOne" : "playerTwo";
    return this.toggleTurn;
  }

  static directionToggle() {
    this.directionBolean = this.directionBolean ? false : true;
    this.currentDirection =
      this.directionBolean === false ? "Horizontal" : "Vertical";
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

  static getAllShipsUsed(playerObj) {
    const computerBoard = playerObj.getPlayerBoard();
    const shipsAvaliable = computerBoard
      .getShips()
      .every((ship) => ship.avalible === false);
    return shipsAvaliable;
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
      shipsAvaliable = GameControl.getAllShipsUsed(this.playerTwo);
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
  }
}

addEventListener("DOMContentLoaded", () => {
  GameControl.startGame();
  GameControl.computerRandomPlace();
  GameDom.directionButton();
  GameDom.refresh();
  GameDom.dragShips();
});
