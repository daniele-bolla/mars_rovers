import { describe, it, expect, vi, beforeEach } from "vitest";
import { runMarsRoverApp } from "../app";
import * as display from "../display/messages.display"; // Import the module containing displayMarsRoverResults
import { INVALID_COMMAND_ERROR_NAME } from "../utils/errorNames";

// Mock console.log to capture output
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});
const mockDisplayMarsRoverResults = vi
  .spyOn(display, "displayMarsRoverResults")
  .mockImplementation(() => {});

describe("runMarsRoverApp", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
    mockDisplayMarsRoverResults.mockClear();
  });

  it("should process the input and display results correctly", async () => {
    const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    await runMarsRoverApp(input);

    // Assertions based on expected calls to displayMarsRoverResults
    expect(mockDisplayMarsRoverResults).toHaveBeenCalledTimes(1);
    const result = mockDisplayMarsRoverResults.mock.calls[0][0];
    expect(result.results).toEqual(["1 3 N", "5 1 E"]);
    expect(result.errors).toEqual([]);
  });

  it("should handle invalid commands and display errors", async () => {
    const input = `5 5
1 2 N
LMLMLMLMMX`; // Invalid command 'X'

    await runMarsRoverApp(input);

    expect(mockDisplayMarsRoverResults).toHaveBeenCalledTimes(1);
    const result = mockDisplayMarsRoverResults.mock.calls[0][0];
    expect(result.results[0]).toContain("1 3 N"); // Rover 1 still moves to its final position before the invalid command
    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.errors[0].name).toBe(INVALID_COMMAND_ERROR_NAME);
  });
});
