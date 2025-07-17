import { Plateau } from "../types";
import { RoverParser } from "../types/parser.types";
import { CommandExecutor, RoverStringifier } from "../types/rover.types";

export const processRoverSafe = (
  roverLine: string,
  commandLine: string,
  plateau: Plateau,
  roverParser: RoverParser,
  commandExecutor: CommandExecutor,
  roverStringifier: RoverStringifier
): { output: string; errors: string[] } => {
  const rover = roverParser.parseRoverWithThrowErrors(roverLine);
  const { rover: finalRover, errors } = commandExecutor.executeCommandsSafe(
    rover,
    commandLine,
    plateau
  );
  return {
    output: roverStringifier.roverToString(finalRover),
    errors,
  };
};
