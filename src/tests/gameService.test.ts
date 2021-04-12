import gameService from "../services/gameService";
import { Orientation } from "../types";

describe("initializing game", () => {
  test("creating a ship from starting coordinate and direction", () => {
    const result = gameService.createShip({ XCoord: "A", YCoord: 1, Orientation: Orientation.ToRight });

    expect(result).toEqual([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);
  });

  test("initializing board with a given ship coordinate array", () => {
    const result = gameService.initBoard([
      [0, 0],
      [1, 0],
      [2, 0],
    ]);

    expect(result).toEqual([
      [1, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
    ]);
  });
});

// describe("playing a round", () => {
//     test("hit, if input coordinates correspond to a ship", () => {
//       const result = gameService.createShip({ XCoord: "A", YCoord: 1, Orientation: Orientation.ToRight });

//       expect(result).toEqual([
//         [0, 0],
//         [1, 0],
//         [2, 0],
//       ]);
//     });
// })
