import { ProcessInputResult } from "../types";
import { displayGrid } from "./grid.display";

export function displayInitialMessage(): void {
  console.log("Welcome to the Mars Rover Challenge!");
  console.log(
    "Please enter the plateau size, followed by rover positions and commands."
  );
  console.log("Enter an empty line twice to finish input.");
}

export function displayMarsRoverResults(result: ProcessInputResult): void {
  const { results, errors, finalRovers, initialRovers, plateau } = result;

  // Show initial state
  console.log("\nInitial State:");
  displayGrid(plateau, initialRovers);

  // Show final state
  console.log("Final State:");
  displayGrid(plateau, finalRovers);

  // Show results
  results.forEach((res, index) => {
    console.log(`Rover ${index + 1}: ${res}`);
  });

  // Show errors
  if (errors.length > 0) {
    console.log("\nErrors:");
    errors.forEach((error) => {
      console.log(`  - ${error.message}`);
    });
  }
}
