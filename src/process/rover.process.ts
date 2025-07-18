import { parseRoverWithErrors } from "../parser";
import { executeCommandsWithErrors, roverToString } from "../rover";
import { Plateau, ProcessRoverResult, OutOfBoundsError } from "../types";
import { isInBounds } from "../validation";

export const processRoverWithErrors = (
  roverLine: string,
  commandLine: string,
  plateau: Plateau
): ProcessRoverResult => {
  const parseResult = parseRoverWithErrors(roverLine);

  if (!parseResult.success) {
    throw parseResult.error;
  }

  const initialRover = parseResult.value;

  if (!isInBounds(initialRover.position, plateau)) {
    throw new OutOfBoundsError(
      `Initial rover position (${initialRover.position.x},${initialRover.position.y}) is out of bounds for plateau (${plateau.width},${plateau.height}).`
    );
  }

  const { rover: finalRover, errors } = executeCommandsWithErrors(
    initialRover,
    commandLine,
    plateau
  );

  return {
    output: roverToString(finalRover),
    finalRover,
    errors,
  };
};
