export const plateauErrorMessages = {
  invalidFormat: "Plateau must have exactly 2 numbers",
  nonPositiveDimensions: "Plateau dimensions must be positive numbers",
  notNumbers: "Plateau dimensions must be numbers",
  exceedsMaxSize: (maxSize: number) => `Plateau dimensions cannot exceed ${maxSize}`,
};

export const roverErrorMessages = {
  invalidFormat: "Rover must have position (x y) and direction: 3 characters in total",
  notNumbers: "Rover position must be numbers",
  negativeCoordinates: "Rover position coordinates must be non-negative",
  invalidDirection: (direction: string, validDirections: string[]) =>
    `Invalid direction: ${direction}, direction must be any of ${validDirections.join(", ")}`,
};

export const collisionErrorMessages = {
  initialCollision: (x: number, y: number) => `Initial position (${x},${y}) collides with another rover.`,
  finalCollision: (x: number, y: number) => `Collision detected at (${x},${y})`,
};

export const outOfBoundsErrorMessages = {
  initialPosition: (x: number, y: number, plateauWidth: number, plateauHeight: number) =>
    `Initial rover position (${x},${y}) is out of bounds for plateau (${plateauWidth},${plateauHeight}).`,
  moveOutOfBounds: (newX: number, newY: number, currentX: number, currentY: number) =>
    `Move to (${newX},${newY}) is out of bounds or invalid. Rover remains at (${currentX},${currentY}).`,
};

export const commandErrorMessages = {
  unknownCommand: (command: string) => `Unknown command: ${command}`,
  invalidCommand: (char: string, index: number) => `Invalid command '${char}' at position ${index}, skipping.`,
};

export const unexpectedErrorMessage = (error: unknown) =>
  `An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`;
