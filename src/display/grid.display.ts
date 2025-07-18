import { Plateau, Rover } from "../types";
import { switchCases } from "../utils/switchCases";

function directionToArrow(direction: string): string {
  return switchCases(
    direction,
    {
      N: () => "↑",
      E: () => "→",
      S: () => "↓",
      W: () => "←",
    },
    () => "?" // Unknown direction
  );
}
export function displayGrid({ height, width }: Plateau, rovers: Rover[]) {
  console.log("\nPlateau:");

  for (let y = height; y >= 0; y--) {
    let row = "";
    for (let x = 0; x <= width; x++) {
      const rover = rovers.find(
        (r) => r.position.x === x && r.position.y === y
      );
      if (rover) {
        row += `[${directionToArrow(rover.direction)}]`;
      } else {
        row += " . ";
      }
    }
    console.log(row);
  }
  console.log("");
}
