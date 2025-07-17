export const DIRECTIONS = ["N", "E", "S", "W"] as const;
export const COMMANDS = ["L", "R", "M"] as const;

export type Direction = (typeof DIRECTIONS)[number];
export type Command = (typeof COMMANDS)[number];

// Type guards
export const isDirection = (value: string): value is Direction => {
  return DIRECTIONS.includes(value as Direction);
};

export const isCommand = (value: string): value is Command => {
  return COMMANDS.includes(value as Command);
};
