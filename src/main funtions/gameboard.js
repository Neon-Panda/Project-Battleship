import { Ship } from "../main funtions/ship.js";

export class Gameboard {
  #board = [];
  #avaliableShips = [
    { Carrier: 5 },
    { Battleship: 4 },
    { Cruiser: 3 },
    { Submarine: 3 },
    { Destroyer: 2 },
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
    if (this.#avaliableShips.includes(ship))
  }

  recieveAttack(row, column) {
    this.#board[row][column].isHit = true;
  }
}
