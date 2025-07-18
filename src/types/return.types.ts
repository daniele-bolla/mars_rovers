import { MarsRoverError } from "./errors.types";
import { Plateau } from "./plateau.types";
import { Rover } from "./rover.types";

export interface ProcessInputResult {
  results: string[];
  errors: MarsRoverError[];
  initialRovers: Rover[];
  finalRovers: Rover[];
  plateau: Plateau;
}

export interface ProcessRoverResult {
  output: string;
  finalRover: Rover;
  errors: MarsRoverError[];
}

export interface ExecuteCommandResult {
  rover: Rover;
  success: boolean;
  message?: string;
}

export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: Error };
