import { describe, it, expect } from "vitest";
import { turnLeft, turnRight } from "../rover/directions.rover";
import { executeCommand, executeCommands } from "../rover/execute.rover";
import { roverToString } from "../rover/tostring.rover";
import { Plateau, Rover } from "../types";
import { outOfBoundsErrorMessages } from "../utils/errorMessages";

describe("rover", () => {
  const plateau: Plateau = { width: 5, height: 5 };

  it("turnLeft should correctly change direction", () => {
    expect(turnLeft("N")).toBe("W");
    expect(turnLeft("W")).toBe("S");
    expect(turnLeft("S")).toBe("E");
    expect(turnLeft("E")).toBe("N");
  });

  it("turnRight should correctly change direction", () => {
    expect(turnRight("N")).toBe("E");
    expect(turnRight("E")).toBe("S");
    expect(turnRight("S")).toBe("W");
    expect(turnRight("W")).toBe("N");
  });

  it("executeCommand should move rover forward correctly", () => {
    const rover: Rover = { position: { x: 1, y: 2 }, direction: "N" };
    const newRover = executeCommand(rover, "M", plateau);
    expect(newRover).toEqual({
      rover: { position: { x: 1, y: 3 }, direction: "N" },
      success: true,
    });
  });

  it("executeCommand should not move rover off plateau", () => {
    const rover: Rover = { position: { x: 5, y: 5 }, direction: "N" };
    const newRover = executeCommand(rover, "M", plateau);
    expect(newRover).toEqual({
      rover: { position: { x: 5, y: 5 }, direction: "N" },
      success: false,
      message: `Out of Bounds Error: ${outOfBoundsErrorMessages.moveOutOfBounds(5, 6, 5, 5)}`,
    });
  });

  it("executeCommands should execute a sequence of commands", () => {
    const rover: Rover = { position: { x: 1, y: 2 }, direction: "N" };
    const commands = "LMLMLMLMM";
    const finalRover = executeCommands(rover, commands, plateau);
    expect(finalRover).toEqual({ position: { x: 1, y: 3 }, direction: "N" });
  });

  it("roverToString should correctly format rover position", () => {
    const rover: Rover = { position: { x: 1, y: 3 }, direction: "N" };
    expect(roverToString(rover)).toBe("1 3 N");
  });
});
