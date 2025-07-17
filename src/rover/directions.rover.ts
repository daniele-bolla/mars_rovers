import {
  Direction,
  Command,
  Position,
  Rover,
  Plateau,
  DIRECTIONS,
  isCommand,
} from "../types";

export const turnLeft = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 3) % 4];
};

export const turnRight = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % 4];
};

export const getMoveDelta = (direction: Direction): Position => {
  switch (direction) {
    case "N":
      return { x: 0, y: 1 };
    case "E":
      return { x: 1, y: 0 };
    case "S":
      return { x: 0, y: -1 };
    case "W":
      return { x: -1, y: 0 };
  }
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
