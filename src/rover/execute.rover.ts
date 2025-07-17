import { Command, isCommand, Plateau, Position, Rover } from "../types";
import {
  getMoveDelta,
  isValidPosition,
  turnLeft,
  turnRight,
} from "./directions.rover";

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
      errors.push(`Invalid command '${char}' at position ${index}, skipping.`);
      return currentRover;
    }
  }, rover);

  return { rover: finalRover, errors };
};
