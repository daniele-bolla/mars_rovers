import { parseRoverWithThrowErrors } from "../parser";
import { executeCommandsSafe, roverToString } from "../rover";
import { Plateau } from "../types";

export const processRoverSafe = (
  roverLine: string,
  commandLine: string,
  plateau: Plateau
): { output: string; errors: string[] } => {
  const rover = parseRoverWithThrowErrors(roverLine);
  const { rover: finalRover, errors } = executeCommandsSafe(
    rover,
    commandLine,
    plateau
  );
  return {
    output: roverToString(finalRover),
    errors,
  };
};
