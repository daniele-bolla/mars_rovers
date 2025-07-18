import { DIRECTIONS, Rover, ParseResult, RoverParsingError } from "../types";
import {
  isNotMadeOfThreeParts,
  isPairNonNegativeNumbers,
  isNotTwoNumbers,
  isDirection,
} from "../validation";
import { roverErrorMessages } from "../utils/errorMessages";
// Parse rover from string "1 2 N"
export const parseRoverWithErrors = (input: string): ParseResult<Rover> => {
  const parts = input.trim().split(" ");

  if (isNotMadeOfThreeParts(parts)) {
    return {
      success: false,
      error: new RoverParsingError(roverErrorMessages.invalidFormat),
    };
  }

  const [xStr, yStr, direction] = parts;
  const x = Number(xStr);
  const y = Number(yStr);

  if (isNotTwoNumbers(x, y)) {
    return { success: false, error: new RoverParsingError(roverErrorMessages.notNumbers) };
  }

  if (!isPairNonNegativeNumbers(x, y)) {
    return {
      success: false,
      error: new RoverParsingError(roverErrorMessages.negativeCoordinates),
    };
  }

  if (!isDirection(direction)) {
    return {
      success: false,
      error: new RoverParsingError(
        roverErrorMessages.invalidDirection(direction, [...DIRECTIONS])
      ),
    };
  }

  return {
    success: true,
    value: {
      position: { x, y },
      direction,
    },
  };
};

export const parseRoverWithThrowErrors = (input: string): Rover => {
  const result = parseRoverWithErrors(input);
  if (!result.success) throw result.error;
  return result.value;
};
