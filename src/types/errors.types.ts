export class MarsRoverError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MarsRoverError";
  }
}

export class PlateauParsingError extends MarsRoverError {
  constructor(message: string) {
    super(`Plateau Parsing Error: ${message}`);
    this.name = "PlateauParsingError";
  }
}

export class RoverParsingError extends MarsRoverError {
  constructor(message: string) {
    super(`Rover Parsing Error: ${message}`);
    this.name = "RoverParsingError";
  }
}

export class InvalidCommandError extends MarsRoverError {
  constructor(message: string) {
    super(`Invalid Command Error: ${message}`);
    this.name = "InvalidCommandError";
  }
}

export class OutOfBoundsError extends MarsRoverError {
  constructor(message: string) {
    super(`Out of Bounds Error: ${message}`);
    this.name = "OutOfBoundsError";
  }
}

export class CollisionError extends MarsRoverError {
  constructor(message: string) {
    super(`Collision Error: ${message}`);
    this.name = "CollisionError";
  }
}
