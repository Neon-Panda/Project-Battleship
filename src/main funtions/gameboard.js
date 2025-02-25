import { Ship } from "../main funtions/ship.js";

export class Gameboard {
  #board = [];
  #boardShips = [
    { name: "Carrier", avalible: true, shipObj: new Ship(5) },
    { name: "Battleship", avalible: true, shipObj: new Ship(4) },
    { name: "Cruiser", avalible: true, shipObj: new Ship(3) },
    { name: "Submarine", avalible: true, shipObj: new Ship(3) },
    { name: "Destroyer", avalible: true, shipObj: new Ship(2) },
  ];

  gameCell() {
    return {
      shipPrecent: null,
      isHit: null,
    };
  }

  createBoard() {
    for (let i = 0; i < 10; i++) {
      let row = [];
      for (let i = 0; i < 10; i++) {
        row.push(this.gameCell());
      }
      this.#board.push(row);
    }
  }

  getBoard() {
    return this.#board;
  }

  placementValid(shipObj, row, column, direction) {
    let avalible = true;
    for (let i = 0; i < shipObj.getLength(); i++) {
      if (this.#board[row][column].shipPrecent === null) {
        continue;
      } else {
        avalible = false;
      }
      direction === "horizontal" ? column++ : row++;
    }
    return avalible;
  }

  correctRowColumn(shipLength, row, column, direction) {
    if (direction === "horizontal" && shipLength + column > 10) {
      column -= (shipLength + column) % 10;
      return { direction: "horizontal", value: column };
    } else if (direction === "vertical" && shipLength + row > 10) {
      row -= (shipLength + row) % 10;
      return { direction: "vertical", value: row };
    } else {
      return direction === "horizontal"
        ? { direction: "horizontal", value: column }
        : { direction: "vertical", value: row };
    }
  }

  placeShip(shipName, row, column, direction = "horizontal") {
    const seletectedShip = this.#boardShips.find(
      (element) => element.name === shipName
    );
    const shipLength = seletectedShip.shipObj.getLength();
    const correctPlacement = this.correctRowColumn(
      shipLength,
      row,
      column,
      direction
    );
    correctPlacement.direction === "horizontal"
      ? (column = correctPlacement.value)
      : (row = correctPlacement.value);
    console.log(column);
    const placementValid = this.placementValid(
      seletectedShip.shipObj,
      row,
      column,
      direction
    );
    if (placementValid) {
      for (let i = 0; i < shipLength; i++) {
        this.#board[row][column].shipPrecent = seletectedShip.shipObj;
        direction === "horizontal" ? column++ : row++;
      }
      seletectedShip.avalible = false;
    }
  }

  recieveAttack(row, column) {
    this.#board[row][column].isHit = true;
    let ship = this.#board[row][column].shipPrecent;
    if (ship) {
      ship.hit();
    }
  }

  checkIfAllSunk() {
    const allShips = this.#boardShips;
    return allShips.every((ship) => ship.shipObj.getIsSunk() === true);
  }
}

const testBoard = new Gameboard();
testBoard.createBoard();
testBoard.placeShip("Carrier", 0, 0);
testBoard.placeShip("Battleship", 1, 0);
testBoard.placeShip("Cruiser", 2, 0);
testBoard.placeShip("Submarine", 3, 0);
testBoard.placeShip("Destroyer", 4, 0);
console.log(testBoard.getBoard());
