import { MARS_ROVER_ERROR_NAME, PLATEAU_PARSING_ERROR_NAME, ROVER_PARSING_ERROR_NAME, INVALID_COMMAND_ERROR_NAME, OUT_OF_BOUNDS_ERROR_NAME, COLLISION_ERROR_NAME } from "../utils/errorNames";

export class MarsRoverError extends Error {
  constructor(message: string) {
    super(message);
    this.name = MARS_ROVER_ERROR_NAME;
  }
}

export class PlateauParsingError extends MarsRoverError {
  constructor(message: string) {
    super(`Plateau Parsing Error: ${message}`);
    this.name = PLATEAU_PARSING_ERROR_NAME;
  }
}

export class RoverParsingError extends MarsRoverError {
  constructor(message: string) {
    super(`Rover Parsing Error: ${message}`);
    this.name = ROVER_PARSING_ERROR_NAME;
  }
}

export class InvalidCommandError extends MarsRoverError {
  constructor(message: string) {
    super(`Invalid Command Error: ${message}`);
    this.name = INVALID_COMMAND_ERROR_NAME;
  }
}

export class OutOfBoundsError extends MarsRoverError {
  constructor(message: string) {
    super(`Out of Bounds Error: ${message}`);
    this.name = OUT_OF_BOUNDS_ERROR_NAME;
  }
}

export class CollisionError extends MarsRoverError {
  constructor(message: string) {
    super(`Collision Error: ${message}`);
    this.name = COLLISION_ERROR_NAME;
  }
}
