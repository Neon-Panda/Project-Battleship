import { Ships } from "../main funtions/ships.js";

describe("Ship class prototypes test", () => {
  let ExampleShip;
  beforeAll(() => {
    ExampleShip = new Ships(4);
  });

  test("ship class exist", () => {
    expect(typeof Ships).toBe("function");
  });

  test("ship has prototype for length & returns correct length", () => {
    expect(ExampleShip.length).toBe(4);
  });

  test("ship has prototype for number of times hit & returns correct number", () => {
    expect(ExampleShip.hits).toBe(0);
  });

  test("ship has prototype to detect if the ship has been sunk", () => {
    expect(ExampleShip.isSunk).toBe(false);
  });
});
