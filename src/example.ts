import { processInput, processInputWithErrors } from "./controller";
import { executeCommands, executeCommandsSafe, roverToString } from "./rover";
import {
  parseRoverWithThrowErrors,
  parsePlateauWithThrowErrors,
} from "./parser";
import { Command, isCommand, Plateau } from "./types";

// Example 1: Basic usage - no type casting needed!
const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

const results = processInput(input);
console.log(results); // ['1 3 N', '5 1 E']

// Example 2: Using individual functions
const plateau = parsePlateauWithThrowErrors("5 5");
const rover = parseRoverWithThrowErrors("1 2 N");

// No casting needed - executeCommands handles the filtering
const finalRover = executeCommands(rover, "LMLMLMLMM", plateau);
console.log(roverToString(finalRover)); // '1 3 N'

// Example 3: Handle invalid commands gracefully
const { rover: safeRover, errors } = executeCommandsSafe(
  rover,
  "LMXLMYLMM", // Contains invalid commands X and Y
  plateau
);
console.log(roverToString(safeRover)); // Processes valid commands
console.log(errors); // ["Invalid command 'X' at position 2", "Invalid command 'Y' at position 5"]

// Example 4: Process with full error reporting
const inputWithErrors = `5 5
1 2 N
LMLXMLMM
3 3 E
MMRMMRMRRM`;

const { results: safeResults, errors: allErrors } =
  processInputWithErrors(inputWithErrors);
console.log(safeResults); // ['1 3 N', '5 1 E']
console.log(allErrors); // [{ rover: 1, errors: ["Invalid command 'X' at position 3"] }]

// Example 5: Creating a rover processor with built-in validation
const createSafeRoverProcessor = (plateau: Plateau) => {
  return (roverString: string, commands: string) => {
    const rover = parseRoverWithThrowErrors(roverString);

    // Filter out invalid commands automatically
    const validCommands = commands
      .split("")
      .filter((char): char is Command => isCommand(char))
      .join("");

    const finalRover = executeCommands(rover, validCommands, plateau);
    return roverToString(finalRover);
  };
};

const marsProcessor = createSafeRoverProcessor({ width: 5, height: 5 });
console.log(marsProcessor("1 2 N", "LMLMLMLMM")); // '1 3 N'
console.log(marsProcessor("1 2 N", "LMXLMYLMM")); // Ignores X and Y
