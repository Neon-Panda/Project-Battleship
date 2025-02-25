export class Ship {
  #length;
  #hits;
  #isSunk;
  constructor(length) {
    this.#length = length;
    this.#hits = 0;
    this.#isSunk = false;
  }

  getLength() {
    return this.#length;
  }

  getHits() {
    return this.#hits;
  }

  getIsSunk() {
    return this.#isSunk;
  }

  hit() {
    this.#hits++;
  }

  checkIfSunkToggle() {
    if (this.#hits >= this.#length) {
      this.#isSunk = true;
    }
  }
}
