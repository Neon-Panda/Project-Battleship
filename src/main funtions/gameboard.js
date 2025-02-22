import { Ship } from "../main funtions/ship.js";

export class Gameboard {
  #board = [];
  #avaliableShips = [
    { name: "Carrier", length: 5 },
    { name: "Battleship", length: 4 },
    { name: "Cruiser", length: 3 },
    { name: "Submarine", length: 3 },
    { name: "Destroyer", length: 2 },
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
    const currentShipIndex = this.#avaliableShips.findIndex(
      (element) => element.name === ship
    );
    if (currentShipIndex >= 0) {
      this.#board[row][column].shipPrecent = new Ship(
        this.#avaliableShips[currentShipIndex].length
      );
      this.#avaliableShips.splice(currentShipIndex, 1);
    }
  }

  recieveAttack(row, column) {
    this.#board[row][column].isHit = true;
  }
}

const testBoard = new Gameboard();
testBoard.createBoard();
console.log(testBoard.placeShip("Carrier", 0, 0));
