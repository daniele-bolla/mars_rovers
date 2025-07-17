import { DIRECTIONS, Plateau, Rover, isDirection } from "../types";

type ParseResult<T> =
  | { success: true; value: T }
  | { success: false; error: string };

// Parse plateau from string "5 5"
export const parsePlateau = (input: string): ParseResult<Plateau> => {
  const parts = input.trim().split(" ");

  if (parts.length !== 2) {
    return { success: false, error: "Plateau must have exactly 2 numbers" };
  }

  const [width, height] = parts.map(Number);

  if (isNaN(width) || isNaN(height)) {
    return { success: false, error: "Plateau dimensions must be numbers" };
  }

  return { success: true, value: { width, height } };
};

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

export const parsePlateauWithThrowErrors = (input: string): Plateau => {
  const result = parsePlateau(input);
  if (!result.success) throw new Error(result.error);
  return result.value;
};

export const parseRoverWithThrowErrors = (input: string): Rover => {
  const result = parseRover(input);
  if (!result.success) throw new Error(result.error);
  return result.value;
};
