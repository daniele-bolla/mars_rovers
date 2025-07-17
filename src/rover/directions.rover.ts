import {
  Direction,
  Position,
  Plateau,
  DIRECTIONS,
} from "../types";
import { switchCases } from "../utils/switchCases";

export const turnLeft = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 3) % 4];
};

export const turnRight = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % 4];
};

export const getMoveDelta = (direction: Direction): Position => {
  return switchCases(
    direction,
    {
      N: () => ({ x: 0, y: 1 }),
      E: () => ({ x: 1, y: 0 }),
      S: () => ({ x: 0, y: -1 }),
      W: () => ({ x: -1, y: 0 }),
    },
    () => {
      throw new Error(`Unknown direction: ${direction}`);
    }
  );
};

export const isValidPosition = (
  position: Position,
  plateau: Plateau
): boolean => {
  return (
    position.x >= 0 &&
    position.x <= plateau.width &&
    position.y >= 0 &&
    position.y <= plateau.height
  );
};
