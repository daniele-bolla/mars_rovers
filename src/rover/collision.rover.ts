import { Position } from "../types";

export const getPositionKey = (position: Position): string => {
  return `${position.x},${position.y}`;
};

export const isCollision = (
  position: Position,
  occupiedPositions: Set<string>
): boolean => {
  return occupiedPositions.has(getPositionKey(position));
};

export const addPositionToOccupied = (
  position: Position,
  occupiedPositions: Set<string>
): void => {
  occupiedPositions.add(getPositionKey(position));
};