import { describe, test, expect } from "vitest";

import { isCommand, isDirection } from "../../src/types";

describe("Type Inference Tests", () => {
  test("type guards should work correctly", () => {
    expect(isCommand("L")).toBe(true);
    expect(isCommand("R")).toBe(true);
    expect(isCommand("M")).toBe(true);
    expect(isCommand("X")).toBe(false);

    expect(isDirection("N")).toBe(true);
    expect(isDirection("E")).toBe(true);
    expect(isDirection("S")).toBe(true);
    expect(isDirection("W")).toBe(true);
    expect(isDirection("X")).toBe(false);
  });
});
