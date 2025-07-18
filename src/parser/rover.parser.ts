import { DIRECTIONS, Rover, ParseResult, RoverParsingError } from "../types";
import {
  isNotMadeOfThreeParts,
  isPairNonNegativeNumbers,
  isNotTwoNumbers,
  isDirection,
} from "../validation";
// Parse rover from string "1 2 N"
export const parseRoverWithErrors = (input: string): ParseResult<Rover> => {
  const parts = input.trim().split(" ");

  if (isNotMadeOfThreeParts(parts)) {
    return {
      success: false,
      error: new RoverParsingError(
        "Rover must have position (x y) and direction: 3 characters in total"
      ),
    };
  }

  const [xStr, yStr, direction] = parts;
  const x = Number(xStr);
  const y = Number(yStr);

  if (isNotTwoNumbers(x, y)) {
    return { success: false, error: new RoverParsingError("Rover position must be numbers") };
  }

  if (!isPairNonNegativeNumbers(x, y)) {
    return {
      success: false,
      error: new RoverParsingError("Rover position coordinates must be non-negative"),
    };
  }

  if (!isDirection(direction)) {
    return {
      success: false,
      error: new RoverParsingError(
        `Invalid direction: ${direction}, direction must be any of ${DIRECTIONS.join(", ")}`
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
