import { Plateau, Rover } from "../types";
function directionToArrow(direction: string): string {
  switch (direction) {
    case "N":
      return "↑";
    case "E":
      return "→";
    case "S":
      return "↓";
    case "W":
      return "←";
    default:
      return "?"; // Unknown direction
  }
}
export function showGrid(plateau: Plateau, rovers: Rover[]) {
  console.log("\nPlateau:");

  for (let y = plateau.height; y >= 0; y--) {
    let row = "";
    for (let x = 0; x <= plateau.width; x++) {
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
