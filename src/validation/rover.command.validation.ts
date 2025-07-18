import { Command, COMMANDS, Direction, DIRECTIONS } from "../types";

// Type guards
export const isDirection = (value: string): value is Direction => {
  return DIRECTIONS.includes(value as Direction);
};

export const isCommand = (value: string): value is Command => {
  return COMMANDS.includes(value as Command);
};
