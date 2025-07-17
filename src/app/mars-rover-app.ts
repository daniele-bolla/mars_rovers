import { processInputWithErrors } from "../process";
import {
  parsePlateauWithThrowErrors,
  parseRoverWithThrowErrors,
} from "../parser";
import { executeCommands } from "../rover";
import { Rover, Plateau } from "../types";

export async function runMarsRoverApp(
  input: string,
  displayGrid: (plateau: Plateau, rovers: Rover[]) => void
) {
  try {
    const lines = input.trim().split("\n");
    const plateau = parsePlateauWithThrowErrors(lines[0]);

    // Show initial state
    console.log("\nInitial State:");
    const initialRovers: Rover[] = [];
    for (let i = 1; i < lines.length; i += 2) {
      const rover = parseRoverWithThrowErrors(lines[i]);
      initialRovers.push(rover);
    }
    displayGrid(plateau, initialRovers);

    // Process commands
    const { results, errors } = processInputWithErrors(input);

    // Show final state
    console.log("Final State:");
    const finalRovers: Rover[] = [];
    for (let i = 1; i < lines.length; i += 2) {
      const rover = parseRoverWithThrowErrors(lines[i]);
      const commands = lines[i + 1];
      const finalRover = executeCommands(rover, commands, plateau);
      finalRovers.push(finalRover);
    }
    displayGrid(plateau, finalRovers);

    // Show results
    console.log("Results:");
    results.forEach((result, index) => {
      console.log(`Rover ${index + 1}: ${result}`);
    });

    // Show errors
    if (errors.length > 0) {
      console.log("\nErrors:");
      errors.forEach(({ rover, errors }) => {
        console.log(`Rover ${rover}:`);
        errors.forEach((error) => console.log(`  - ${error}`));
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("Error:", error);
    }
  }
}
