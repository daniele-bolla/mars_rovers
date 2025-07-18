import { describe, it, expect, vi, beforeEach } from "vitest";
import { displayGrid } from "../display/grid.display";
import { Plateau, Rover } from "../types";

const mockConsoleLog = vi.spyOn(console, "log").mockImplementation(() => {});

describe("displayGrid", () => {
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

    displayGrid(plateau, rovers);

    expect(mockConsoleLog).toHaveBeenCalledWith("\nPlateau:");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  . [→] .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" . [↑] .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith(" .  .  .  .  .  . ");
    expect(mockConsoleLog).toHaveBeenCalledWith("");
  });
});
