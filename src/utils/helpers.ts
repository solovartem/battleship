import config from "../utils/config";

const createValidationArrays = () => {
  for (let i = 0; i < config.BOARD_COLUMNS; i++) {
    config.VALIDATION_COLUMN.push(1 + i);
  }

  for (let i = 0; i < config.BOARD_ROWS; i++) {
    config.VALIDATION_ROW.push(String.fromCharCode(65 + i));
  }
};

const createInputMessages = () => {
  const rowMessage = `(a letter between ${config.VALIDATION_ROW[0]} - ${
    config.VALIDATION_ROW[config.VALIDATION_ROW.length - 1]
  })`;

  const columnMessage = `(a number between ${config.VALIDATION_COLUMN[0]} - ${
    config.VALIDATION_COLUMN[config.VALIDATION_COLUMN.length - 1]
  })`;

  config.SHIP_X_MESSAGE = `Enter X Coordinate ${rowMessage}`;

  config.SHIP_Y_MESSAGE = `Enter Y Coordinate ${columnMessage}`;

  config.FIRE_X_MESSAGE = `Enter X Coordinate To Shoot! ${rowMessage}`;

  config.FIRE_Y_MESSAGE = `Enter Y Coordinate To Shoot! ${columnMessage}`;
};

export default { createValidationArrays, createInputMessages };
