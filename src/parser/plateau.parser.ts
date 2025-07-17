import { ParseResult, Plateau } from "../types";

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

export const parsePlateauWithThrowErrors = (input: string): Plateau => {
  const result = parsePlateau(input);
  if (!result.success) throw new Error(result.error);
  return result.value;
};
