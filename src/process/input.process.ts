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

  roverCommandPairs.forEach(([roverLine, commandLine], index) => {
    const roverNumber = index + 1; // Rovers are 1-indexed

    const initialRover = parseRoverWithThrowErrors(roverLine);
    initialRovers.push(initialRover);

    const { output, errors: roverErrors } = processRoverWithErrors(
      roverLine,
      commandLine,
      plateau
    );

    results.push(output);

    if (roverErrors.length > 0) {
      errors.push({ rover: roverNumber, errors: roverErrors });
    }

    // Calculate final rover state for display
    const finalRover = executeCommands(initialRover, commandLine, plateau);
    finalRovers.push(finalRover);
  });

  return { results, errors, initialRovers, finalRovers, plateau };
};
