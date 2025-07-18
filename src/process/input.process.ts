import {
  parsePlateauWithThrowErrors,
  parseRoverWithThrowErrors,
} from "../parser";
import { processRoverWithErrors } from "./rover.process";
import { Rover, ProcessInputResult } from "../types";
import { executeCommands } from "../rover";

export const processInputWithErrors = (input: string): ProcessInputResult => {
  const lines = input.trim().split("\n");
  const plateau = parsePlateauWithThrowErrors(lines[0]);

  const initialRovers: Rover[] = [];
  const finalRovers: Rover[] = [];
  const results: string[] = [];
  const errors: Array<{ rover: number; errors: string[] }> = [];

  // Group lines into rover-command pairs
  const roverCommandPairs = lines
    .slice(1)
    .reduce<string[][]>((pairs, line, index) => {
      if (index % 2 === 0) {
        // Start a new pair
        return [...pairs, [line]];
      }
      // Add command line to the last pair
      pairs[pairs.length - 1].push(line);
      return pairs;
    }, []);

  // This set will store the final positions of all successfully moved rovers
  const occupiedFinalPositions = new Set<string>();

  roverCommandPairs.forEach(([roverLine, commandLine], index) => {
    const roverNumber = index + 1; // Rovers are 1-indexed

    const initialRover = parseRoverWithThrowErrors(roverLine);
    initialRovers.push(initialRover); // Always add initial rover to the list

    // Process the rover's movement and get potential errors (e.g., out of bounds)
    const { output, errors: roverProcessingErrors } = processRoverWithErrors(
      roverLine,
      commandLine,
      plateau
    );

    results.push(output); // Always push the output string

    // Calculate the potential final state of the rover
    const potentialFinalRover = executeCommands(initialRover, commandLine, plateau);
    const potentialFinalPositionKey = `${potentialFinalRover.position.x},${potentialFinalRover.position.y}`;

    if (roverProcessingErrors.length > 0) {
      // If there are processing errors (e.g., out of bounds), record them.
      // This rover does not successfully reach its potentialFinalRover position.
      errors.push({ rover: roverNumber, errors: roverProcessingErrors });
      // Do NOT add to finalRovers or occupiedFinalPositions as it failed to move.
    } else if (occupiedFinalPositions.has(potentialFinalPositionKey)) {
      // If no processing errors, but a collision is detected with an already occupied final position
      errors.push({
        rover: roverNumber,
        errors: [
          `Collision detected at (${potentialFinalRover.position.x},${potentialFinalRover.position.y})`,
        ],
      });
      // Do NOT add to finalRovers or occupiedFinalPositions as it collided.
    } else {
      // If no processing errors and no collision, the rover successfully moves.
      finalRovers.push(potentialFinalRover);
      occupiedFinalPositions.add(potentialFinalPositionKey);
    }
  });

  return { results, errors, initialRovers, finalRovers, plateau };
};
