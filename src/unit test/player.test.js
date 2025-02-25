import { Player } from "../main funtions/player";

describe("Player class test", () => {
  let examplePlayerOne;

  beforeEach(() => {
    examplePlayerOne = new Player("Human", "John");
  });

  test("Player class creates a board for the player", () => {
    expect(examplePlayerOne.getPlayerBoard()).toEqual({});
  });

  test("Player class has name and 'type'", () => {
    expect(examplePlayerOne.getName()).toBe("John");
    expect(examplePlayerOne.getType()).toBe("Human");
  });
});
