import { Gameboard } from "../main funtions/gameboard";

describe("Gameboard class test", () => {
  let exampleGameboard = new Gameboard();

  test("gameboard class exist", () => {
    expect(typeof Gameboard).toBe("function");
  });

  test("gameboard should create a grid of 10 arrays each with 10 objects", () => {
    exampleGameboard.createBoard();
    let exampleGameCellObj = { isHit: null, shipPrecent: null };
    expect(Array.isArray(exampleGameboard.getBoard())).toBe(true);
    expect(exampleGameboard.getBoard()[0][0]).toStrictEqual(exampleGameCellObj);
    expect(exampleGameboard.getBoard()[2][6]).toStrictEqual(exampleGameCellObj);
    expect(exampleGameboard.getBoard()[6][9]).toStrictEqual(exampleGameCellObj);
    expect(exampleGameboard.getBoard()[9][9]).toStrictEqual(exampleGameCellObj);
  });

  test("should check if gamecells are avalible for ship placement", () => {
    exampleGameboard.placementValid("BattleShip", 0, 0).toBe(false);
  });

  test("should place ship in gameboard in correct coordinates", () => {
    exampleGameboard.placeShip("Carrier", 0, 0);
    let firstGameCell = exampleGameboard.getBoard()[0][0];
    expect(firstGameCell.shipPrecent).toBe(typeof Object);
  });

  test("gameboard should receive attack & set gamecell prototype 'isHit' to true", () => {
    exampleGameboard.recieveAttack(0, 0);
    expect(exampleGameboard.getBoard()[0][0].isHit).toBe(true);
  });

  test("if gamecell is attacked & ship is precent it should attack the ship", () => {});
});
