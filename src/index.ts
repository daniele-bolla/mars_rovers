import * as readline from "readline";
import { runMarsRoverApp } from "./app";
import { displayInitialMessage } from "./display";

async function main() {
  displayInitialMessage();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Get input
  const input = await new Promise<string>((resolve) => {
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

  await runMarsRoverApp(input);

  rl.close();
}

main();
