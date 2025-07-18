import {
  Command,
  Plateau,
  Position,
  Rover,
  ExecuteCommandResult,
  OutOfBoundsError,
  InvalidCommandError,
  MarsRoverError,
} from "../types";
import { getMoveDelta, turnLeft, turnRight } from "./directions.rover";
import { switchCases } from "../utils/switchCases";
import { isCommand, isInBounds } from "../validation";

export const executeCommand = (
  rover: Rover,
  command: Command,
  plateau: Plateau
): ExecuteCommandResult => {
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

        if (isInBounds(newPosition, plateau)) {
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
          message: new OutOfBoundsError(
            `Move to (${newPosition.x},${newPosition.y}) is out of bounds or invalid. Rover remains at (${rover.position.x},${rover.position.y}).`
          ).message,
        };
      },
    },
    () => ({
      rover: rover,
      success: false,
      message: new InvalidCommandError(`Unknown command: ${command}`).message,
    })
  );
};

export const executeCommands = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): Rover => {
  const commandArray = commands.split("").filter(isCommand);

  return commandArray.reduce((currentRover, command) => {
    const { rover: newRover } = executeCommand(currentRover, command, plateau);
    return newRover;
  }, rover);
};

export const executeCommandsWithErrors = (
  rover: Rover,
  commands: string,
  plateau: Plateau
): { rover: Rover; errors: MarsRoverError[] } => {
  const errors: MarsRoverError[] = [];

  const finalRover = commands.split("").reduce((currentRover, char, index) => {
    if (isCommand(char)) {
      const {
        rover: newRover,
        success,
        message,
      } = executeCommand(currentRover, char, plateau);
      if (!success && message) {
        const isErrorsEmpty = errors.length === 0;
        const isMessageNotInErrors = errors[errors.length - 1]?.message !== message; // Compare message property
        if (isErrorsEmpty || isMessageNotInErrors) {
          errors.push(new MarsRoverError(message)); // Push MarsRoverError instance
        }
      }
      return newRover;
    } else {
      errors.push(new InvalidCommandError(`Invalid command '${char}' at position ${index}, skipping.`));
      return currentRover;
    }
  }, rover);

  return { rover: finalRover, errors };
};
