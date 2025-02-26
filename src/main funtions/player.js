import { Gameboard } from "../main funtions/gameboard";

export class Player {
  #playerType;
  #playerName;
  #playerGameBoard;

  constructor(type, name) {
    this.#playerType = type;
    this.#playerName = name;
    this.#playerGameBoard = new Gameboard();
    this.#playerGameBoard.createBoard();
  }

  getPlayerBoard() {
    return this.#playerGameBoard;
  }

  getName() {
    return this.#playerName;
  }

  setName(name) {
    this.#playerName = name;
  }

  getType() {
    return this.#playerType;
  }
}
