import { CoordinateStatus, Orientation, ShipPositionData, ShipCoordinateData } from "../types";
import config from "../utils/config";

const createShip = (shipPositionData: ShipPositionData): number[][] => {
  const shipArray = [];
  const XCoord: number = shipPositionData.XCoord.charCodeAt(0) - 65;
  const YCoord: number = shipPositionData.YCoord - 1;

  shipArray.push([XCoord, YCoord]);
  shipArray.push([
    XCoord +
      1 *
        (shipPositionData.Orientation === Orientation.ToRight
          ? 1
          : shipPositionData.Orientation === Orientation.ToLeft
          ? -1
          : 0),
    YCoord +
      1 *
        (shipPositionData.Orientation === Orientation.ToDown
          ? 1
          : shipPositionData.Orientation === Orientation.ToUp
          ? -1
          : 0),
  ]);
  shipArray.push([
    XCoord +
      2 *
        (shipPositionData.Orientation === Orientation.ToRight
          ? 1
          : shipPositionData.Orientation === Orientation.ToLeft
          ? -1
          : 0),
    YCoord +
      2 *
        (shipPositionData.Orientation === Orientation.ToDown
          ? 1
          : shipPositionData.Orientation === Orientation.ToUp
          ? -1
          : 0),
  ]);

  return shipArray;
};

const initBoard = (ship: number[][]) => {
  const board: number[][] = [];
  for (let i = 0; i < config.BOARD_COLUMNS; i++) {
    const row = [];
    for (let j = 0; j < config.BOARD_ROWS; j++) {
      row.push(CoordinateStatus.Empty);
    }
    board.push(row);
  }

  //place ship to board
  ship.forEach((coord) => {
    board[coord[1]][coord[0]] = CoordinateStatus.Ship;
  });

  return board;
};

const changeBoard = (board: number[][], x: number, y: number) => {
  if (board[y][x] === CoordinateStatus.Ship) {
    console.log("You Hit the Ship. Nice One!");
    board[y].splice(x, 1, CoordinateStatus.Hit);
  } else if (board[y][x] === CoordinateStatus.Empty) {
    console.log("You missed!");
    board[y].splice(x, 1, CoordinateStatus.Miss);
  } else {
    console.log("You already fired to this coordinate in previous rounds. Are you distracted?");
  }
};

const playRound = (firingCoordinate: ShipCoordinateData) => {
  let board: number[][];

  if (config.ROUND % 2 === 1) {
    board = config.BOARD2;
  } else {
    board = config.BOARD1;
  }

  changeBoard(board, firingCoordinate.XCoord, firingCoordinate.YCoord);

  console.log(`End of Round ${config.ROUND}`);
  console.log(config.BOARD1);
  console.log(config.BOARD2);
};

function shipStillStanding(board: number[][]) {
  for (let i = 0; i < board.length; i++) {
    const index = board[i].indexOf(CoordinateStatus.Ship);
    if (index > -1) {
      return true;
    }
  }
  return false;
}

const checkBoardStatus = () => {
  return shipStillStanding(config.BOARD1) && shipStillStanding(config.BOARD2);
};

export default { createShip, initBoard, playRound, checkBoardStatus };
