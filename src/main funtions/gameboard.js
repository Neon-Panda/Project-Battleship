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

  placeShip(ship, row, column, direction = "horizontal") {
    const seletectedShip = this.#boardShips.find(
      (element) => element.name === ship
    );
    const shipLength = seletectedShip.shipObj.getLength();
    if (direction === "horizontal" && shipLength + column > 10) {
      column -= (shipLength + column) % 10;
    }
    if (direction === "vertial" && shipLength + row > 10) {
      row -= (shipLength + row) % 10;
    }
    for (let i = 0; i < shipLength; i++) {
      if (
        seletectedShip.avalible &&
        this.#board[row][column].shipPrecent === null
      ) {
        this.#board[row][column].shipPrecent = seletectedShip.shipObj;
        this.#boardShips.avalible = false;
        column++;
      }
    }
  }

  recieveAttack(row, column) {
    this.#board[row][column].isHit = true;
  }
}

const testBoard = new Gameboard();
testBoard.createBoard();
console.log(testBoard.placeShip("Carrier", 9, 9));
console.log(testBoard.getBoard());
