import { Ships } from "../main funtions/ships.js";

describe("Ship class test", () => {
  let ExampleShip;
  beforeAll(() => {
    ExampleShip = new Ships(4);
  });

  test("ship class exist", () => {
    expect(typeof Ships).toBe("function");
  });

  test("ship has prototype for length and function that returns length", () => {
    expect(ExampleShip.length).toBe(4);
  });
});
