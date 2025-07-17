import { Plateau } from "./plateau.types";
import { Rover } from "./rover.types";

export interface ProcessInputResult {
  results: string[];
  errors: Array<{ rover: number; errors: string[] }>;
  initialRovers: Rover[];
  finalRovers: Rover[];
  plateau: Plateau;
}

export interface ProcessRoverResult {
  output: string;
  errors: string[];
}

export interface ExecuteCommandResult {
  rover: Rover;
  success: boolean;
  message?: string;
}

export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };
