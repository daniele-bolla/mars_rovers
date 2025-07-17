import { processInputWithErrors } from "../process";
import { Rover, Plateau } from "../types";

export async function runMarsRoverApp(
  input: string,
  displayGrid: (plateau: Plateau, rovers: Rover[]) => void
) {
  try {
    const { results, errors, finalRovers, initialRovers, plateau } =
      processInputWithErrors(input);

    // Show initial state
    console.log("\nInitial State:");
    displayGrid(plateau, initialRovers);

    // Show final state
    console.log("Final State:");
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
