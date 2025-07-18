export const MAX_PLATEAU_SIZE = 100;

export function isPlateauDimensionsMaxValid(
  width: number,
  height: number
): boolean {
  return width <= MAX_PLATEAU_SIZE && height <= MAX_PLATEAU_SIZE;
}
