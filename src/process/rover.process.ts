import { parseRoverWithErrors } from "../parser";
import { executeCommandsWithErrors, isValidPosition, roverToString } from "../rover";
import { Plateau, ProcessRoverResult } from "../types";

export const processRoverWithErrors = (
  roverLine: string,
  commandLine: string,
  plateau: Plateau
): ProcessRoverResult => {
  const parseResult = parseRoverWithErrors(roverLine);

  if (!parseResult.success) {
    return {
      output: "", // No output for a rover that couldn't be parsed
      errors: [`Failed to parse rover: ${parseResult.error}`],
    };
  }

  const initialRover = parseResult.value;

  // Validate initial rover position against plateau boundaries
  if (!isValidPosition(initialRover.position, plateau)) {
    return {
      output: roverToString(initialRover),
      errors: [
        `Initial rover position (${initialRover.position.x},${initialRover.position.y}) is out of bounds for plateau (${plateau.width},${plateau.height}).`,
      ],
    };
  }

  const { rover: finalRover, errors } = executeCommandsWithErrors(
    initialRover,
    commandLine,
    plateau
  );
  return {
    output: roverToString(finalRover),
    errors,
  };
};
