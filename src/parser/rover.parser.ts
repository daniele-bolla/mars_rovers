import { DIRECTIONS, Rover, isDirection, ParseResult } from "../types";
// Parse rover from string "1 2 N"
export const parseRover = (input: string): ParseResult<Rover> => {
  const parts = input.trim().split(" ");

  if (parts.length !== 3) {
    return {
      success: false,
      error:
        "Rover must have position (x y) and direction: 3 characters in total",
    };
  }

  const [xStr, yStr, direction] = parts;
  const x = Number(xStr);
  const y = Number(yStr);

  if (isNaN(x) || isNaN(y)) {
    return { success: false, error: "Rover position must be numbers" };
  }

  if (!isDirection(direction)) {
    return {
      success: false,
      error: `Invalid direction: ${direction}, direction must be any of ${DIRECTIONS.join(", ")}`,
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
  const result = parseRover(input);
  if (!result.success) throw new Error(result.error);
  return result.value;
};
