import { Position, Plateau } from "../types";

export const isInBounds = (position: Position, plateau: Plateau): boolean => {
  return (
    position.x >= 0 &&
    position.x <= plateau.width &&
    position.y >= 0 &&
    position.y <= plateau.height
  );
};
