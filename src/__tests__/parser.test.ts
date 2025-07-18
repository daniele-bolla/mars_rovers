import { describe, it, expect } from "vitest";
import { parsePlateauWithErrors } from "../parser/plateau.parser";
import { parseRoverWithErrors } from "../parser/rover.parser";
import { PlateauParsingError, RoverParsingError } from "../types";
import { plateauErrorMessages, roverErrorMessages } from "../utils/errorMessages";

describe("parser", () => {
  it("parsePlateau should correctly parse valid plateau input", () => {
    const result = parsePlateauWithErrors("5 5");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toEqual({ width: 5, height: 5 });
    }
  });

  it("parseRover should correctly parse valid rover input", () => {
    const result = parseRoverWithErrors("1 2 N");
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toEqual({
        position: { x: 1, y: 2 },
        direction: "N",
      });
    }
  });

  it("parsePlateau should return error for invalid plateau input", () => {
    const result = parsePlateauWithErrors("5");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(PlateauParsingError);
      expect(result.error.message).toBe(`Plateau Parsing Error: ${plateauErrorMessages.invalidFormat}`);
    }
  });

  it("parseRover should return error for invalid rover input", () => {
    const result = parseRoverWithErrors("1 2 X");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(RoverParsingError);
      expect(result.error.message).toBe(
        `Rover Parsing Error: ${roverErrorMessages.invalidDirection("X", ["N", "E", "S", "W"])}`
      );
    }
  });

  it("parsePlateau should return error for non-positive dimensions", () => {
    const result = parsePlateauWithErrors("5 0");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(PlateauParsingError);
      expect(result.error.message).toBe(`Plateau Parsing Error: ${plateauErrorMessages.nonPositiveDimensions}`);
    }
  });

  it("parsePlateau should return error for dimensions exceeding maximum size", () => {
    const result = parsePlateauWithErrors("101 5");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(PlateauParsingError);
      expect(result.error.message).toBe(`Plateau Parsing Error: ${plateauErrorMessages.exceedsMaxSize(100)}`);
    }
  });

  it("parseRover should return error for negative coordinates", () => {
    const result = parseRoverWithErrors("-1 2 N");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBeInstanceOf(RoverParsingError);
      expect(result.error.message).toBe(
        `Rover Parsing Error: ${roverErrorMessages.negativeCoordinates}`
      );
    }
  });
});
