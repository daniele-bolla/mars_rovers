import { describe, it, expect } from "vitest";
import { processInputWithErrors } from "../process/input.process";

describe("process", () => {
  it("processInput should correctly process a simple input string", () => {
    const input = `5 5\n1 2 N\nLMLMLMLMM`;
    const expectedOutput = {
      results: ["1 3 N"],
      errors: [],
      initialRovers: [{ position: { x: 1, y: 2 }, direction: 'N' }],
      finalRovers: [{ position: { x: 1, y: 3 }, direction: 'N' }],
      plateau: { width: 5, height: 5 },
    };
    const result = processInputWithErrors(input);
    expect(result).toEqual(expectedOutput);
  });
  it("processInput should correctly process a input string, other example", () => {
    const input = `3 3\n1 1 E\nMRM`;
    const expectedOutput = {
      results: ["2 0 S"],
      errors: [],
      initialRovers: [{ position: { x: 1, y: 1 }, direction: 'E' }],
      finalRovers: [{ position: { x: 2, y: 0 }, direction: 'S' }],
      plateau: { width: 3, height: 3 },
    };
    const result = processInputWithErrors(input);
    expect(result).toEqual(expectedOutput);
  });

  it("processInputWithErrors should correctly process an input string with errors", () => {
    const input = `5 5\n1 2 N\nLMLMLMLMMX`;
    const { results, errors } = processInputWithErrors(input);
    expect(results).toEqual(["1 3 N"]);
    expect(errors).toEqual([
      {
        rover: 1,
        errors: ["Invalid command 'X' at position 9, skipping."],
      },
    ]);
  });

  it("processInputWithErrors should report errors for out-of-bounds moves", () => {
    const input = `5 5\n1 2 N\nMMMMMM`; // Rover tries to move beyond the plateau
    const { results, errors } = processInputWithErrors(input);
    expect(results).toEqual(["1 5 N"]); // Rover should stop at the boundary
    expect(errors).toEqual([
      {
        rover: 1,
        errors: [
          "Move to (1,6) is out of bounds or invalid. Rover remains at (1,5).",
        ],
      },
    ]);
  });

  it("processInputWithErrors should report errors for out-of-bounds initial rover position", () => {
    const input = `5 5\n6 2 N\nM`; // Rover starts out of bounds
    const { results, errors, initialRovers, finalRovers, plateau } = processInputWithErrors(input);
    expect(results).toEqual(["6 2 N"]);
    expect(errors).toEqual([
      {
        rover: 1,
        errors: [
          "Initial rover position (6,2) is out of bounds for plateau (5,5).",
        ],
      },
    ]);
    expect(initialRovers).toEqual([{ position: { x: 6, y: 2 }, direction: 'N' }]);
    expect(finalRovers).toEqual([]);
    expect(plateau).toEqual({ width: 5, height: 5 });
  });

  it("processInputWithErrors should report collision when two rovers end up in the same position", () => {
    const input = `5 5\n1 2 N\nM\n1 1 N\nMM`; // Rover 1 moves to 1 3 N, Rover 2 moves to 1 3 N
    const { results, errors, initialRovers, finalRovers, plateau } = processInputWithErrors(input);
    expect(results).toEqual(["1 3 N", "1 3 N"]);
    expect(errors).toEqual([
      {
        rover: 2,
        errors: ["Collision detected at (1,3)"],
      },
    ]);
    expect(initialRovers).toEqual([
      { position: { x: 1, y: 2 }, direction: 'N' },
      { position: { x: 1, y: 1 }, direction: 'N' },
    ]);
    expect(finalRovers).toEqual([
      { position: { x: 1, y: 3 }, direction: 'N' },
    ]);
    expect(plateau).toEqual({ width: 5, height: 5 });
  });

  it("processInputWithErrors should report error for initial rover collision", () => {
    const input = `5 5\n1 2 N\nM\n1 2 N\nM`; // Two rovers start at the same position
    const { results, errors, initialRovers, finalRovers, plateau } = processInputWithErrors(input);
    expect(results).toEqual(["1 3 N"]); // Only the first rover's result is processed
    expect(errors).toEqual([
      {
        rover: 2,
        errors: ["Initial position (1,2) collides with another rover."],
      },
    ]);
    expect(initialRovers).toEqual([
      { position: { x: 1, y: 2 }, direction: 'N' },
      { position: { x: 1, y: 2 }, direction: 'N' },
    ]);
    expect(finalRovers).toEqual([
      { position: { x: 1, y: 3 }, direction: 'N' },
    ]);
    expect(plateau).toEqual({ width: 5, height: 5 });
  });
});