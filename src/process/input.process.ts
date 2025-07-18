import {
  parsePlateauWithThrowErrors,
  parseRoverWithThrowErrors,
} from "../parser";
import { processRoverWithErrors } from "./rover.process";
import { Rover, ProcessInputResult } from "../types";
import { executeCommands } from "../rover";
import { isCollision, addPositionToOccupied } from "../rover/collision.rover"; // New import

export const processInputWithErrors = (input: string): ProcessInputResult => {
  const lines = input.trim().split("\n");
  const plateau = parsePlateauWithThrowErrors(lines[0]);

  const initialRovers: Rover[] = [];
  const finalRovers: Rover[] = [];
  const results: string[] = [];
  const errors: Array<{ rover: number; errors: string[] }> = [];
  const initialOccupiedPositions = new Set<string>(); // New set for initial positions

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

  // Check for initial collisions among rovers and filter out invalid rovers
  const validInitialRovers: {
    rover: Rover;
    commandLine: string;
    roverNumber: number;
    roverLine: string;
  }[] = [];
  roverCommandPairs.forEach(([roverLine, commandLine], index) => {
    const roverNumber = index + 1;
    try {
      const initialRover = parseRoverWithThrowErrors(roverLine);
      initialRovers.push(initialRover); // Always add initial rover to the list
      if (isCollision(initialRover.position, initialOccupiedPositions)) {
        errors.push({
          rover: roverNumber,
          errors: [
            `Initial position (${initialRover.position.x},${initialRover.position.y}) collides with another rover.`,
          ],
        });
      } else {
        addPositionToOccupied(initialRover.position, initialOccupiedPositions);
        validInitialRovers.push({
          rover: initialRover,
          commandLine,
          roverNumber,
          roverLine,
        });
      }
    } catch (e) {
      errors.push({
        rover: roverNumber,
        errors: [
          `Failed to parse initial rover position: ${e instanceof Error ? e.message : String(e)}`,
        ],
      });
    }
  });

  // This set will store the final positions of all successfully moved rovers
  const occupiedFinalPositions = new Set<string>();

  validInitialRovers.forEach(
    ({ rover: initialRover, commandLine, roverNumber, roverLine }) => {
      // Process the rover's movement and get potential errors (e.g., out of bounds)
      const { output, errors: roverProcessingErrors } = processRoverWithErrors(
        roverLine,
        commandLine,
        plateau
      );

      results.push(output); // Always push the output string

      // Calculate the potential final state of the rover
      const potentialFinalRover = executeCommands(
        initialRover,
        commandLine,
        plateau
      );

      if (roverProcessingErrors.length > 0) {
        // If there are processing errors (e.g., out of bounds), record them.
        // This rover does not successfully reach its potentialFinalRover position.
        errors.push({ rover: roverNumber, errors: roverProcessingErrors });
        // Do NOT add to finalRovers or occupiedFinalPositions as it failed to move.
      } else if (
        isCollision(potentialFinalRover.position, occupiedFinalPositions)
      ) {
        // Use utility function
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
        addPositionToOccupied(
          potentialFinalRover.position,
          occupiedFinalPositions
        ); // Use utility function
      }
    }
  );

  return { results, errors, initialRovers, finalRovers, plateau };
};
