import inquirer from "inquirer";
import { Orientation } from "../types";

import config from "../utils/config";

const validateStringInput = {
  validate: (input: string) => {
    if (config.VALIDATION_ROW.includes(input.toUpperCase())) {
      return true;
    } else {
      return "Please enter a valid choice";
    }
  },
  filter: (input: string) => {
    return !config.VALIDATION_ROW.includes(input.toUpperCase()) ? "" : input.toUpperCase();
  },
};

const validateNumberInput = {
  validate: (input: number) => {
    if (config.VALIDATION_COLUMN.includes(input)) {
      return true;
    } else {
      return "Please enter a valid choice";
    }
  },
  filter: (input: number) => {
    return Number.isNaN(input) || !config.VALIDATION_COLUMN.includes(input) ? "" : Number(input);
  },
};

const askShipCoordinates = () => {
  const questions = [
    {
      name: "XCoord",
      type: "input",
      message: config.SHIP_X_MESSAGE,
      ...validateStringInput,
    },
    {
      name: "YCoord",
      type: "number",
      message: config.SHIP_Y_MESSAGE,
      ...validateNumberInput,
    },
  ];
  return inquirer.prompt(questions);
};

const askShipOrientation = (x: string, y: number) => {
  let horizontalchoices;
  let verticalchoices;

  if (config.VALIDATION_ROW.slice(0, 2).includes(x)) {
    horizontalchoices = [Orientation.ToRight];
  } else if (config.VALIDATION_ROW.slice(6).includes(x)) {
    horizontalchoices = [Orientation.ToLeft];
  } else {
    horizontalchoices = [Orientation.ToRight, Orientation.ToLeft];
  }

  if (config.VALIDATION_COLUMN.slice(0, 2).includes(y)) {
    verticalchoices = [Orientation.ToDown];
  } else if (config.VALIDATION_COLUMN.slice(6).includes(y)) {
    verticalchoices = [Orientation.ToUp];
  } else {
    verticalchoices = [Orientation.ToUp, Orientation.ToDown];
  }

  const choicesArray = horizontalchoices.concat(verticalchoices);

  const questions = [
    {
      name: "Orientation",
      type: "list",
      message: "Choose the Direction to Place the Ship",
      choices: choicesArray,
    },
  ];
  return inquirer.prompt(questions);
};

const fire = () => {
  const questions = [
    {
      name: "XCoord",
      type: "input",
      message: config.FIRE_X_MESSAGE,
      ...validateStringInput,
    },
    {
      name: "YCoord",
      type: "number",
      message: config.FIRE_Y_MESSAGE,
      ...validateNumberInput,
    },
  ];
  return inquirer.prompt(questions);
};

export default { askShipCoordinates, askShipOrientation, fire };
