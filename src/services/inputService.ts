import inquirer from "../lib/inquirer";
import { PlayerShipsInputs, ShipCoordinateData, ShipCoordinateInput, ShipOrientationInput } from "../types";

const getPositionInputs = async (): Promise<PlayerShipsInputs> => {
  console.log("Place Ship for Player 1");
  const player1Coords: ShipCoordinateInput = await inquirer.askShipCoordinates();
  const player1Orientation: ShipOrientationInput = await inquirer.askShipOrientation(
    player1Coords.XCoord,
    player1Coords.YCoord
  );
  const player1 = { ...player1Coords, ...player1Orientation };

  console.log("Place Ship for Player 2");
  const player2Coords: ShipCoordinateInput = await inquirer.askShipCoordinates();
  const player2Orientation: ShipOrientationInput = await inquirer.askShipOrientation(
    player2Coords.XCoord,
    player2Coords.YCoord
  );
  const player2 = { ...player2Coords, ...player2Orientation };
  console.log(player2);

  return { player1, player2 };
};

const getFiringInput = async (): Promise<ShipCoordinateData> => {
  const firingCoords: ShipCoordinateInput = await inquirer.fire();

  const XCoord: number = firingCoords.XCoord.charCodeAt(0) - 65;
  const YCoord: number = firingCoords.YCoord - 1;

  return { XCoord, YCoord };
};

export default { getPositionInputs, getFiringInput };
