import * as readline from "readline";
import { runMarsRoverApp } from "./app/mars-rover-app";
import { showGrid } from "./display/grid.display";

async function main() {
  console.log("Mars Rover Control\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

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

  await runMarsRoverApp(input, showGrid);

  rl.close();
}

main();
