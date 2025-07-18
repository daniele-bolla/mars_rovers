export function isPairNonNegativeNumbers(x: number, y: number): boolean {
  return x >= 0 && y >= 0;
}

export function isPairPositiveNumbers(x: number, y: number): boolean {
  return x > 0 && y > 0;
}

export function isNotMadeOfTwoParts(parts: string[]): boolean {
  return parts.length !== 2;
}

export function isNotMadeOfThreeParts(parts: string[]): boolean {
  return parts.length !== 3;
}

export function isNotTwoNumbers(x: number, y: number): boolean {
  return isNaN(x) || isNaN(y);
}

export * from "./plateau.validation";
export * from "./rover.position.validation";
export * from "./rover.command.validation";
export * from "./rover.collision.validation";
