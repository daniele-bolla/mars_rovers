import {
  Direction,
  Command,
  Position,
  Rover,
  Plateau,
  DIRECTIONS,
  isCommand,
} from "./types";

const turnLeft = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 3) % 4];
};

const turnRight = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % 4];
};

const getMoveDelta = (direction: Direction): Position => {
  switch (direction) {
    case "N":
      return { x: 0, y: 1 };
    case "E":
      return { x: 1, y: 0 };
    case "S":
      return { x: 0, y: -1 };
    case "W":
      return { x: -1, y: 0 };
  }
};

const isValidPosition = (position: Position, plateau: Plateau): boolean => {
  return (
    position.x >= 0 &&
    position.x <= plateau.width &&
    position.y >= 0 &&
    position.y <= plateau.height
  );
};

export const executeCommand = (
  rover: Rover,
  command: Command,
  plateau: Plateau
): Rover => {
  switch (command) {
    case "L":
      return {
        ...rover,
        direction: turnLeft(rover.direction),
      };

    case "R":
      return {
        ...rover,
        direction: turnRight(rover.direction),
      };

    case "M": {
      const delta = getMoveDelta(rover.direction);
      const newPosition: Position = {
        x: rover.position.x + delta.x,
        y: rover.position.y + delta.y,
      };

      if (isValidPosition(newPosition, plateau)) {
        return {
          ...rover,
          position: newPosition,
        };
      }
      return rover;
    }
  }
};

export const executeCommands = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): Rover => {
  const commandArray = commands.split("").filter(isCommand); // This acts as a guard for type safety, returning only valid commands

  return commandArray.reduce(
    (currentRover, command) => executeCommand(currentRover, command, plateau),
    rover
  );
};

export const executeCommandsSafe = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): { rover: Rover; errors: string[] } => {
  const errors: string[] = [];

  const finalRover = commands.split("").reduce((currentRover, char, index) => {
    if (isCommand(char)) {
      return executeCommand(currentRover, char, plateau);
    } else {
      errors.push(`Invalid command '${char}' at position ${index}`);
      return currentRover;
    }
  }, rover);

  return { rover: finalRover, errors };
};

export const roverToString = (rover: Rover): string => {
  return `${rover.position.x} ${rover.position.y} ${rover.direction}`;
};
