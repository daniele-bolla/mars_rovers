import { ParseResult, Plateau, PlateauParsingError } from "../types";
import {
  isNotTwoNumbers,
  isNotMadeOfTwoParts,
  isPairPositiveNumbers,
  isPlateauDimensionsMaxValid,
  MAX_PLATEAU_SIZE,
} from "../validation";
import { plateauErrorMessages } from "../utils/errorMessages";

export const parsePlateauWithErrors = (input: string): ParseResult<Plateau> => {
  const parts = input.trim().split(" ");

  if (isNotMadeOfTwoParts(parts)) {
    return {
      success: false,
      error: new PlateauParsingError(plateauErrorMessages.invalidFormat),
    };
  }

  const [width, height] = parts.map(Number);

  if (!isPairPositiveNumbers(width, height)) {
    return {
      success: false,
      error: new PlateauParsingError(
        plateauErrorMessages.nonPositiveDimensions
      ),
    };
  }

  if (isNotTwoNumbers(width, height)) {
    return {
      success: false,
      error: new PlateauParsingError(plateauErrorMessages.notNumbers),
    };
  }

  if (!isPlateauDimensionsMaxValid(width, height)) {
    return {
      success: false,
      error: new PlateauParsingError(
        plateauErrorMessages.exceedsMaxSize(MAX_PLATEAU_SIZE)
      ),
    };
  }

  return { success: true, value: { width, height } };
};

export const parsePlateauWithThrowErrors = (input: string): Plateau => {
  const result = parsePlateauWithErrors(input);
  if (!result.success) throw result.error;
  return result.value;
};
