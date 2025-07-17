import { describe, it, expect, vi, beforeEach } from "vitest";
import { showGrid } from "../display/grid.display";
import { Plateau, Rover } from "../types";

const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("showGrid", () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  it("should display the grid with rovers", () => {
    const plateau: Plateau = { width: 5, height: 5 };
    const rovers: Rover[] = [
      {
        position: { x: 1, y: 2 },
        direction: "N",
      },
      {
        position: { x: 3, y: 3 },
        direction: "E",
      },
    ];

    showGrid(plateau, rovers);

    expect(mockConsoleLog).toHaveBeenCalledWith("\nPlateau:");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  . [E] .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" . [N] .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith("");
  });
});
