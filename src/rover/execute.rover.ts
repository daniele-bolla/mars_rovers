import { Command, isCommand, Plateau, Position, Rover } from "../types";
import {
  getMoveDelta,
  isValidPosition,
  turnLeft,
  turnRight,
} from "./directions.rover";
import { switchCases } from "../utils/switchCases";

export const executeCommand = (
  rover: Rover,
  command: Command,
  plateau: Plateau
): { rover: Rover; success: boolean; message?: string } => {
  type ExecuteCommandResult = {
    rover: Rover;
    success: boolean;
    message?: string;
  };

  return switchCases<Command, ExecuteCommandResult>(
    command,
    {
      L: () => ({
        rover: {
          ...rover,
          direction: turnLeft(rover.direction),
        },
        success: true,
      }),
      R: () => ({
        rover: {
          ...rover,
          direction: turnRight(rover.direction),
        },
        success: true,
      }),
      M: () => {
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
      },
    },
    () => ({
      rover: rover,
      success: false,
      message: `Unknown command: ${command}`,
    })
  );
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

export const executeCommandsWithErrors = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): { rover: Rover; errors: string[] } => {
  const errors: string[] = [];

  const finalRover = commands.split("").reduce((currentRover, char, index) => {
    if (isCommand(char)) {
      const {
        rover: newRover,
        success,
        message,
      } = executeCommand(currentRover, char, plateau);
      if (!success && message) {
        const isErrorsEmpty = errors.length === 0;
        const isMessageNotInErrors = errors[errors.length - 1] !== message;
        if (isErrorsEmpty || isMessageNotInErrors) {
          errors.push(message);
        }
      }
      return newRover;
    } else {
      errors.push(`Invalid command '${char}' at position ${index}, skipping.`);
      return currentRover;
    }
  }, rover);

  return { rover: finalRover, errors };
};
