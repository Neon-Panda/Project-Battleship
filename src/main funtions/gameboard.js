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

  placeShip(ship, row, column) {
    const seletectedShip = this.#boardShips.find(
      (element) => element.name === ship
    );
    this.#board[row][column].shipPrecent = seletectedShip.shipObj;
  }

  recieveAttack(row, column) {
    this.#board[row][column].isHit = true;
  }
}

const testBoard = new Gameboard();
testBoard.createBoard();
console.log(testBoard.placeShip("Carrier", 0, 0));
