import { describe, it, expect } from "vitest";
import { processInput } from "../process/input.process";

describe("process", () => {
  it("processInput should correctly process a simple input string", () => {
    const input = `5 5\n1 2 N\nLMLMLMLMM`;
    const expectedOutput = ["1 3 N"];
    const result = processInput(input);
    expect(result).toEqual(expectedOutput);
  });
  it("processInput should correctly process a input string, other example", () => {
    const input = `3 3\n1 1 E\nMRM`;
    const expectedOutput = ["2 0 S"];
    const result = processInput(input);
    expect(result).toEqual(expectedOutput);
  });
});
