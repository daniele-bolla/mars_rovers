import { parseRoverWithErrors } from "../parser";
import { executeCommandsWithErrors, roverToString } from "../rover";
import { Plateau, ProcessRoverResult, OutOfBoundsError } from "../types";
import { isInBounds } from "../validation";
import { outOfBoundsErrorMessages } from "../utils/errorMessages";

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
      outOfBoundsErrorMessages.initialPosition(
        initialRover.position.x,
        initialRover.position.y,
        plateau.width,
        plateau.height
      )
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
