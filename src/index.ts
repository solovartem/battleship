import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";

import config from "./utils/config";
import helpers from "./utils/helpers";
import gameService from "./services/gameService";
import inputService from "./services/inputService";

clear();

helpers.createValidationArrays();
helpers.createInputMessages();

console.log(chalk.yellow(figlet.textSync("CLI Battleship", { horizontalLayout: "full" })));

const playGame = async () => {
  config.ROUND++;

  console.log(config.ROUND % 2 === 1 ? "Player 1 ," : "Player 2 ,", "It is Your Turn. Think Carefully!");

  const firingCoordinate = await inputService.getFiringInput();

  gameService.playRound(firingCoordinate);

  if (gameService.checkBoardStatus()) {
    void playGame();
  } else {
    console.log("you sunk my battleship");
  }
};

const createGame = async () => {
  console.log("Setting Up the Game");

  //ask players for ship's positions
  const playerPositions = await inputService.getPositionInputs();

  // create objects representing ship objects' coordinates
  const ship1 = gameService.createShip(playerPositions.player1);
  const ship2 = gameService.createShip(playerPositions.player2);

  // init boards
  config.BOARD1 = gameService.initBoard(ship1);
  config.BOARD2 = gameService.initBoard(ship2);

  console.log(config.BOARD1);
  console.log(config.BOARD2);

  console.log("Game is afoot. ");
  void playGame();
};

const init = () => {
  void createGame();
};
init();
