import { parseRover } from "../parser";
import { executeCommandsSafe, isValidPosition, roverToString } from "../rover";
import { Plateau } from "../types";

export const processRoverSafe = (
  roverLine: string,
  commandLine: string,
  plateau: Plateau
): { output: string; errors: string[] } => {
  const parseResult = parseRover(roverLine);

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

  const { rover: finalRover, errors } = executeCommandsSafe(
    initialRover,
    commandLine,
    plateau
  );
  return {
    output: roverToString(finalRover),
    errors,
  };
};
