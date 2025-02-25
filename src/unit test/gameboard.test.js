import { Gameboard } from "../main funtions/gameboard";

describe("Gameboard class test", () => {
  let exampleGameboard;

  beforeEach(() => {
    exampleGameboard = new Gameboard();
    exampleGameboard.createBoard();
  });

  test("gameboard class exist", () => {
    expect(typeof Gameboard).toBe("function");
  });

  test("gameboard should create a grid of 10 arrays each with 10 objects", () => {
    let exampleGameCellObj = { isHit: null, shipPrecent: null };
    expect(Array.isArray(exampleGameboard.getBoard())).toBe(true);
    expect(exampleGameboard.getBoard()[5][5]).toMatchObject(exampleGameCellObj);
  });

  test("should place ship in gameboard in correct coordinates", () => {
    exampleGameboard.placeShip("Cruiser", 0, 0);
    let firstGameCell = exampleGameboard.getBoard()[0][0];
    expect(firstGameCell.shipPrecent).toEqual({});
  });

  test("gameboard should receive attack & set gamecell prototype 'isHit' to true", () => {
    exampleGameboard.recieveAttack(0, 0);
    expect(exampleGameboard.getBoard()[0][0].isHit).toBe(true);
  });

  test("if gamecell is attacked & ship is precent it should attack the ship", () => {});
});
