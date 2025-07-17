import { describe, it, expect } from 'vitest';
import { parsePlateau } from '../parser/plateau.parser';
import { parseRover } from '../parser/rover.parser';

describe('parser', () => {
  it('parsePlateau should correctly parse valid plateau input', () => {
    const result = parsePlateau('5 5');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toEqual({ width: 5, height: 5 });
    }
  });

  it('parseRover should correctly parse valid rover input', () => {
    const result = parseRover('1 2 N');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.value).toEqual({ position: { x: 1, y: 2 }, direction: 'N' });
    }
  });

  it('parsePlateau should return error for invalid plateau input', () => {
    const result = parsePlateau('5');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Plateau must have exactly 2 numbers');
    }
  });

  it('parseRover should return error for invalid rover input', () => {
    const result = parseRover('1 2 X');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Invalid direction: X, direction must be any of N, E, S, W');
    }
  });

  it('parsePlateau should return error for non-positive dimensions', () => {
    const result = parsePlateau('5 0');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Plateau dimensions must be positive numbers');
    }
  });

  it('parsePlateau should return error for dimensions exceeding maximum size', () => {
    const result = parsePlateau('101 5');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error).toBe('Plateau dimensions cannot exceed 100');
    }
  });
});