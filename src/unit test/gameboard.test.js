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
    expect(exampleGameboard.getBoard()[0][0]).toMatchObject(exampleGameCellObj);
    expect(exampleGameboard.getBoard()[5][5]).toMatchObject(exampleGameCellObj);
    expect(exampleGameboard.getBoard()[9][9]).toMatchObject(exampleGameCellObj);
  });

  test("should place ship in gameboard in correct coordinates", () => {
    exampleGameboard.placeShip("Cruiser", 0, 0);
    let gameCellZeroZero = exampleGameboard.getBoard()[0][0];
    let gameCellZeroTwo = exampleGameboard.getBoard()[0][2];
    expect(gameCellZeroZero.shipPrecent).toEqual({});
    expect(gameCellZeroTwo.shipPrecent).toEqual({});

    exampleGameboard.placeShip("Carrier", 9, 9);
    let gameCellNineFive = exampleGameboard.getBoard()[9][5];
    let gameCellNineNine = exampleGameboard.getBoard()[9][9];
    expect(gameCellNineFive.shipPrecent).toEqual({});
    expect(gameCellNineNine.shipPrecent).toEqual({});
  });

  test("gameboard should receive attack & set gamecell prototype 'isHit' to true", () => {
    exampleGameboard.recieveAttack(0, 0);
    exampleGameboard.recieveAttack(5, 5);
    exampleGameboard.recieveAttack(9, 9);
    expect(exampleGameboard.getBoard()[0][0].isHit).toBe(true);
    expect(exampleGameboard.getBoard()[5][5].isHit).toBe(true);
    expect(exampleGameboard.getBoard()[9][9].isHit).toBe(true);
  });

  test("if gamecell is attacked & ship is precent it should attack the ship", () => {
    exampleGameboard.placeShip("Cruiser", 0, 0);
    exampleGameboard.recieveAttack(0, 0);
    exampleGameboard.recieveAttack(0, 0);
    const hits = exampleGameboard.getBoard()[0][0].shipPrecent.getHits();
    expect(hits).toBe(2);
  });

  test("if all ships have been sunk the board should know", () => {
    exampleGameboard.placeShip("Cruiser", 0, 0);
    exampleGameboard.placeShip("Battleship", 1, 0);
    exampleGameboard.placeShip("Cruiser", 2, 0);
    exampleGameboard.placeShip("Submarine", 3, 0);
    exampleGameboard.placeShip("Destroyer", 4, 0);
  });
});
