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
): { rover: Rover; success: boolean; message?: string } => {
  switch (command) {
    case "L":
      return {
        rover: {
          ...rover,
          direction: turnLeft(rover.direction),
        },
        success: true,
      };

    case "R":
      return {
        rover: {
          ...rover,
          direction: turnRight(rover.direction),
        },
        success: true,
      };

    case "M": {
      const delta = getMoveDelta(rover.direction);
      const newPosition: Position = {
        x: rover.position.x + delta.x,
        y: rover.position.y + delta.y,
      };

      if (isValidPosition(newPosition, plateau)) {
        return {
          rover: {
            ...rover,
            position: newPosition,
          },
          success: true,
        };
      }
      return {
        rover: rover,
        success: false,
        message: `Move to (${newPosition.x},${newPosition.y}) is out of bounds or invalid. Rover remains at (${rover.position.x},${rover.position.y}).`,
      };
    }
  }
};

export const executeCommands = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): Rover => {
  const commandArray = commands.split("").filter(isCommand); // This acts as a guard for type safety, returning only valid commands

  return commandArray.reduce((currentRover, command) => {
    const { rover: newRover } = executeCommand(currentRover, command, plateau);
    return newRover;
  }, rover);
};

export const executeCommandsSafe = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): { rover: Rover; errors: string[] } => {
  const errors: string[] = [];
  let lastErrorMessage: string | undefined = undefined;

  const finalRover = commands.split("").reduce((currentRover, char, index) => {
    if (isCommand(char)) {
      const {
        rover: newRover,
        success,
        message,
      } = executeCommand(currentRover, char, plateau);
      if (!success && message) {
        if (message !== lastErrorMessage) {
          errors.push(message);
          lastErrorMessage = message;
        }
      } else {
        lastErrorMessage = undefined; // Reset if move was successful
      }
      return newRover;
    } else {
      errors.push(`Invalid command '${char}' at position ${index}, skipping.`);
      lastErrorMessage = undefined; // Reset for invalid command type
      return currentRover;
    }
  }, rover);

  return { rover: finalRover, errors };
};
