import {
  parsePlateauWithThrowErrors,
  parseRoverWithThrowErrors,
} from "../parser";
import { processRoverWithErrors } from "./rover.process";
import {
  Rover,
  ProcessInputResult,
  CollisionError,
  MarsRoverError,
} from "../types";
import { isCollision, addPositionToOccupied } from "../validation";

export const processInputWithErrors = (input: string): ProcessInputResult => {
  const lines = input.trim().split("\n");
  const initialRovers: Rover[] = [];
  const finalRovers: Rover[] = [];
  const results: string[] = [];
  const errors: MarsRoverError[] = [];
  const initialOccupiedPositions = new Set<string>();

  const plateau = parsePlateauWithThrowErrors(lines[0]);

  const roverCommandPairs: string[][] = [];
  for (let i = 1; i < lines.length; i += 2) {
    if (i + 1 < lines.length) {
      roverCommandPairs.push([lines[i], lines[i + 1]]);
    }
  }

  const validInitialRovers: {
    rover: Rover;
    commandLine: string;
    roverNumber: number;
    roverLine: string;
  }[] = [];
  roverCommandPairs.forEach(([roverLine, commandLine], index) => {
    const roverNumber = index + 1;
    const initialRover = parseRoverWithThrowErrors(roverLine);
    initialRovers.push(initialRover);
    if (isCollision(initialRover.position, initialOccupiedPositions)) {
      throw new CollisionError(
        `Initial position (${initialRover.position.x},${initialRover.position.y}) collides with another rover.`
      );
    } else {
      addPositionToOccupied(initialRover.position, initialOccupiedPositions);
      validInitialRovers.push({
        rover: initialRover,
        commandLine,
        roverNumber,
        roverLine,
      });
    }
  });

  const occupiedFinalPositions = new Set<string>();

  validInitialRovers.forEach(({ commandLine, roverLine }) => {
    const {
      output,
      finalRover,
      errors: roverProcessingErrors,
    } = processRoverWithErrors(roverLine, commandLine, plateau);

    results.push(output);

    if (roverProcessingErrors.length > 0) {
      errors.push(...roverProcessingErrors);
    } else if (isCollision(finalRover.position, occupiedFinalPositions)) {
      throw new CollisionError(
        `Collision detected at (${finalRover.position.x},${finalRover.position.y})`
      );
    } else {
      finalRovers.push(finalRover);
      addPositionToOccupied(finalRover.position, occupiedFinalPositions);
    }
  });

  return { results, errors, initialRovers, finalRovers, plateau };
};
