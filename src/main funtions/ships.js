export class Ships {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.sunk = false;
  }
}

const test = new Ships(3);
console.log(test.length);
