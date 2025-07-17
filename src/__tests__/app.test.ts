import { describe, it, expect, vi, beforeEach } from "vitest";
import { runMarsRoverApp } from '../app/mars-rover-app';

// Mock console.log to capture output
const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("runMarsRoverApp", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  it("should process the input and display results correctly", async () => {
    const input = `5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM`;

    const mockDisplayGrid = vi.fn();

    await runMarsRoverApp(input, mockDisplayGrid);

    // Assertions based on expected console output and mock calls
    expect(mockConsoleLog).toHaveBeenCalledWith("\nInitial State:");
    expect(mockDisplayGrid).toHaveBeenCalledTimes(2); // Initial and Final state
    expect(mockConsoleLog).toHaveBeenCalledWith("Final State:");
    expect(mockConsoleLog).toHaveBeenCalledWith("Results:");
    expect(mockConsoleLog).toHaveBeenCalledWith("Rover 1: 1 3 N");
    expect(mockConsoleLog).toHaveBeenCalledWith("Rover 2: 5 1 E");
  });

  it("should handle errors gracefully", async () => {
    const invalidInput = `5 5
1 2 X
LMLMLMLMM`; // Invalid rover direction

    const mockDisplayGrid = vi.fn();

    await runMarsRoverApp(invalidInput, mockDisplayGrid);

    expect(mockConsoleLog).toHaveBeenCalledWith(
      "Error:",
      "Invalid direction: X, direction must be any of N, E, S, W"
    );
    expect(mockDisplayGrid).not.toHaveBeenCalled();
  });
});
