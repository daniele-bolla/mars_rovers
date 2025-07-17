export const DIRECTIONS = ["N", "E", "S", "W"] as const;
export const COMMANDS = ["L", "R", "M"] as const;

export type Direction = (typeof DIRECTIONS)[number];
export type Command = (typeof COMMANDS)[number];

export interface Position {
  readonly x: number;
  readonly y: number;
}

export interface Rover {
  readonly position: Position;
  readonly direction: Direction;
}

export interface Plateau {
  readonly width: number;
  readonly height: number;
}

// Type guards
export const isDirection = (value: string): value is Direction => {
  return DIRECTIONS.includes(value as Direction);
};

export const isCommand = (value: string): value is Command => {
  return COMMANDS.includes(value as Command);
};
