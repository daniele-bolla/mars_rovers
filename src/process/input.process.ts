import { parsePlateauWithThrowErrors } from "../parser";
import { processRoverSafe } from "./rover.process";

export const processInput = (input: string): string[] => {
  const lines = input.trim().split("\n");

  // First line is plateau
  const plateau = parsePlateauWithThrowErrors(lines[0]);

  // Process each rover (every 2 lines after plateau)
  const results: string[] = [];

  for (let i = 1; i < lines.length; i += 2) {
    const roverLine = lines[i];
    const commandLine = lines[i + 1];

    const result = processRoverSafe(roverLine, commandLine, plateau).output;
    results.push(result);
  }

  return results;
};

export const processInputWithErrors = (
  input: string
): {
  results: string[];
  errors: Array<{ rover: number; errors: string[] }>;
} => {
  const lines = input.trim().split("\n");
  const plateau = parsePlateauWithThrowErrors(lines[0]);

  const results: string[] = [];
  const allErrors: Array<{ rover: number; errors: string[] }> = [];

  let roverNumber = 0;
  for (let i = 1; i < lines.length; i += 2) {
    roverNumber++;
    const roverLine = lines[i];
    const commandLine = lines[i + 1];

    const { output, errors } = processRoverSafe(
      roverLine,
      commandLine,
      plateau
    );
    results.push(output);

    if (errors.length > 0) {
      allErrors.push({ rover: roverNumber, errors });
    }
  }

  return { results, errors: allErrors };
};

// // Functional version using array methods
// export const processInputFunctional = (input: string): string[] => {
//   const lines = input.trim().split("\n");
//   const plateau = parsePlateauWithThrowErrors(lines[0]);

//   // Create pairs and process them
//   return lines
//     .slice(1)
//     .reduce<string[][]>((pairs, line, index) => {
//       if (index % 2 === 0) {
//         return [...pairs, [line]];
//       }
//       pairs[pairs.length - 1].push(line);
//       return pairs;
//     }, [])
//     .map(
//       ([roverLine, commandLine]) =>
//         processRoverSafe(roverLine, commandLine, plateau).output
//     );
// };
