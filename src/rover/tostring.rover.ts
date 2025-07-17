import { Rover } from "../types";

export const roverToString = (rover: Rover): string => {
  return `${rover.position.x} ${rover.position.y} ${rover.direction}`;
};
