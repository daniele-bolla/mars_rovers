import * as readline from "readline";
import { processInput } from "./controller";
import {
  parsePlateauWithThrowErrors,
  parseRoverWithThrowErrors,
} from "./parser";
import { executeCommands } from "./rover";
import { Rover, Plateau } from "./types";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Simple grid display
function showGrid(plateau: Plateau, rovers: Rover[]) {
  console.log("\nPlateau:");

  for (let y = plateau.height; y >= 0; y--) {
    let row = "";
    for (let x = 0; x <= plateau.width; x++) {
      const rover = rovers.find(
        (r) => r.position.x === x && r.position.y === y
      );
      if (rover) {
        row += `[${rover.direction}]`;
      } else {
        row += " . ";
      }
    }
    console.log(row);
  }
  console.log("");
}

async function main() {
  console.log("Mars Rover Control\n");

  // Get input
  const input = await new Promise<string>((resolve) => {
    console.log("Paste your input (press Enter twice when done):");
    console.log("Example input:");
    console.log("5 5");
    console.log("1 2 N");
    console.log("LMLMLMLMM");
    console.log("3 3 E");
    console.log("MMRMMRMRRM");
    console.log("**************\n");
    const lines: string[] = [];
    let emptyLineCount = 0;

    rl.on("line", (line) => {
      if (line === "") {
        emptyLineCount++;
        if (emptyLineCount === 2) {
          resolve(lines.join("\n"));
        }
      } else {
        emptyLineCount = 0;
        lines.push(line);
      }
    });
  });

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
    showGrid(plateau, initialRovers);

    // Process commands
    const results = processInput(input);

    // Show final state
    console.log("Final State:");
    const finalRovers: Rover[] = [];
    for (let i = 1; i < lines.length; i += 2) {
      const rover = parseRoverWithThrowErrors(lines[i]);
      const commands = lines[i + 1];
      const finalRover = executeCommands(rover, commands, plateau);
      finalRovers.push(finalRover);
    }
    showGrid(plateau, finalRovers);

    // Show results
    console.log("Results:");
    results.forEach((result, index) => {
      console.log(`Rover ${index + 1}: ${result}`);
    });
  } catch (error) {
    if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("Error:", error);
    }
  }

  rl.close();
}

main();
