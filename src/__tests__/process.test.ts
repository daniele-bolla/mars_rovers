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
});
