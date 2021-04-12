export interface ShipCoordinateInput {
  XCoord: string;
  YCoord: number;
}

export interface ShipOrientationInput {
  Orientation: Orientation;
}

export interface ShipPositionData extends ShipCoordinateInput, ShipOrientationInput {}

export interface PlayerShipsInputs {
  player1: ShipPositionData;
  player2: ShipPositionData;
}

export interface ShipCoordinateData {
  XCoord: number;
  YCoord: number;
}

export enum Orientation {
  ToRight = "ToRight",
  ToLeft = "ToLeft",
  ToUp = "ToUp",
  ToDown = "ToDown",
}

export enum CoordinateStatus {
  Empty = 0,
  Ship = 1,
  Hit = 2,
  Miss = 3,
}
