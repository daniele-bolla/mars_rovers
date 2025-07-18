import { ParseResult, Plateau, PlateauParsingError } from "../types";
import {
  isNotTwoNumbers,
  isNotMadeOfTwoParts,
  isPairPositiveNumbers,
  isPlateauDimensionsMaxValid,
  MAX_PLATEAU_SIZE,
} from "../validation";

// Parse plateau from string "5 5"
export const parsePlateauWithErrors = (input: string): ParseResult<Plateau> => {
  const parts = input.trim().split(" ");

  if (isNotMadeOfTwoParts(parts)) {
    return { success: false, error: new PlateauParsingError("Plateau must have exactly 2 numbers") };
  }

  const [width, height] = parts.map(Number);

  if (!isPairPositiveNumbers(width, height)) {
    return {
      success: false,
      error: new PlateauParsingError("Plateau dimensions must be positive numbers"),
    };
  }

  if (isNotTwoNumbers(width, height)) {
    return { success: false, error: new PlateauParsingError("Plateau dimensions must be numbers") };
  }

  if (!isPlateauDimensionsMaxValid(width, height)) {
    return {
      success: false,
      error: new PlateauParsingError(`Plateau dimensions cannot exceed ${MAX_PLATEAU_SIZE}`),
    };
  }

  return { success: true, value: { width, height } };
};

export const parsePlateauWithThrowErrors = (input: string): Plateau => {
  const result = parsePlateauWithErrors(input);
  if (!result.success) throw result.error;
  return result.value;
};
