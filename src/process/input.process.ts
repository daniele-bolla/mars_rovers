import { parsePlateauWithThrowErrors } from "../parser";
import { processRoverSafe } from "./rover.process";

export const processInputWithErrors = (
  input: string
): {
  results: string[];
  errors: Array<{ rover: number; errors: string[] }>;
} => {
  const lines = input.trim().split("\n");
  const plateau = parsePlateauWithThrowErrors(lines[0]);

  const initialAccumulator: {
    results: string[];
    errors: Array<{ rover: number; errors: string[] }>;
  } = {
    results: [],
    errors: [],
  };

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

  // Process each pair and accumulate results and errors
  const finalState = roverCommandPairs.reduce(
    (acc, [roverLine, commandLine], index) => {
      const roverNumber = index + 1; // Rovers are 1-indexed
      const { output, errors } = processRoverSafe(
        roverLine,
        commandLine,
        plateau
      );

      acc.results.push(output);

      if (errors.length > 0) {
        acc.errors.push({ rover: roverNumber, errors });
      }

      return acc;
    },
    initialAccumulator
  );

  return finalState;
};
