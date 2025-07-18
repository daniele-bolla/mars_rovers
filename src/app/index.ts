import { processInputWithErrors } from "../process";
import { displayMarsRoverResults } from "../display";
import { MarsRoverError } from "../types";

export async function runMarsRoverApp(input: string) {
  try {
    const result = processInputWithErrors(input);
    displayMarsRoverResults(result);
  } catch (error) {
    if (error instanceof MarsRoverError) {
      console.error("Error:", error.message);
    } else if (error instanceof Error) {
      console.error("An unexpected error occurred:", error.message);
    } else {
      console.error("An unknown error occurred:", error);
    }
  }
}
