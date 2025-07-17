import { describe, it, expect } from "vitest";
import { processInputWithErrors } from "../process/input.process";

describe("process", () => {
  it("processInput should correctly process a simple input string", () => {
    const input = `5 5\n1 2 N\nLMLMLMLMM`;
    const expectedOutput = {
      results: ["1 3 N"],
      errors: [],
    };
    const result = processInputWithErrors(input);
    expect(result).toEqual(expectedOutput);
  });
  it("processInput should correctly process a input string, other example", () => {
    const input = `3 3\n1 1 E\nMRM`;
    const expectedOutput = {
      results: ["2 0 S"],
      errors: [],
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
    const { results, errors } = processInputWithErrors(input);
    expect(results).toEqual(["6 2 N"]);
    expect(errors).toEqual([
      {
        rover: 1,
        errors: [
          "Initial rover position (6,2) is out of bounds for plateau (5,5).",
        ],
      },
    ]);
  });
});
