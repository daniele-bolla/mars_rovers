export const DIRECTIONS = ["N", "E", "S", "W"] as const;
export const COMMANDS = ["L", "R", "M"] as const;

export type Direction = (typeof DIRECTIONS)[number];
export type Command = (typeof COMMANDS)[number];
