import { Direction } from "./command.types";

export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Rover {
  readonly position: Position;
  readonly direction: Direction;
}
