import { Ship } from "../main funtions/ship.js";

describe("Ship class test", () => {
  let ExampleShip;

  beforeAll(() => {
    ExampleShip = new Ship(4);
  });

  test("ship class exist", () => {
    expect(typeof Ship).toBe("function");
  });

  test("ship function returns length of ship", () => {
    expect(ExampleShip.getLength()).toBe(4);
  });

  test("ship function adds hit to ship object", () => {
    ExampleShip.hit();
    expect(ExampleShip.getHits()).toBe(1);
  });

  test("ship function return true if ship has been sunk", () => {
    ExampleShip.hit();
    ExampleShip.hit();
    ExampleShip.hit();
    ExampleShip.checkIfSunkToggle();
    expect(ExampleShip.getIsSunk()).toBe(true);
  });
});
