import { Direction } from "./command.types";
import { Plateau } from "./plateau.types";

export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Rover {
  readonly position: Position;
  readonly direction: Direction;
}

export interface TurningLogic {
  turnLeft(direction: Direction): Direction;
  turnRight(direction: Direction): Direction;
}

export interface CommandExecutor {
  executeCommandsSafe(
    rover: Rover,
    commands: string,
    plateau: Plateau
  ): { rover: Rover; errors: string[] };
}

export interface RoverStringifier {
  roverToString(rover: Rover): string;
}
