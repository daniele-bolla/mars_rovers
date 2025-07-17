import { ParseResult, Plateau, MAX_PLATEAU_SIZE } from "../types";

// Parse plateau from string "5 5"
export const parsePlateauWithErrors = (input: string): ParseResult<Plateau> => {
  const parts = input.trim().split(" ");

  if (parts.length !== 2) {
    return { success: false, error: "Plateau must have exactly 2 numbers" };
  }

  const [width, height] = parts.map(Number);

  if (isNaN(width) || isNaN(height)) {
    return { success: false, error: "Plateau dimensions must be numbers" };
  }

  if (width <= 0 || height <= 0) {
    return {
      success: false,
      error: "Plateau dimensions must be positive numbers",
    };
  }

  if (width > MAX_PLATEAU_SIZE || height > MAX_PLATEAU_SIZE) {
    return {
      success: false,
      error: `Plateau dimensions cannot exceed ${MAX_PLATEAU_SIZE}`,
    };
  }

  return { success: true, value: { width, height } };
};

export const parsePlateauWithThrowErrors = (input: string): Plateau => {
  const result = parsePlateauWithErrors(input);
  if (!result.success) throw new Error(result.error);
  return result.value;
};
