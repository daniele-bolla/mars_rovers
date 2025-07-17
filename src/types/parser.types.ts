import { Plateau } from "./plateau.types";
import { Rover } from "./rover.types";

export type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

export interface RoverParser {
  parseRoverWithThrowErrors(input: string): Rover;
}

export interface PlateauParser {
  parsePlateauWithThrowErrors(input: string): Plateau;
}

export interface InputProcessor {
  processInput(
    input: string,
    plateauParser: PlateauParser,
    roverParser: RoverParser
  ): string[];
}

export interface CommandExecutorSimple {
  executeCommands(
    rover: Rover,
    commands: string,
    plateau: Plateau
  ): Rover;
}

export interface MainAppDependencies {
  inputProcessor: InputProcessor;
  plateauParser: PlateauParser;
  roverParser: RoverParser;
  commandExecutorSimple: CommandExecutorSimple;
}
