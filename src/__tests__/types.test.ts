import { describe, it, expect } from 'vitest';
import { isCommand, isDirection } from '../types';

describe('types', () => {
  it('isDirection should return true for valid directions', () => {
    expect(isDirection('N')).toBe(true);
    expect(isDirection('E')).toBe(true);
    expect(isDirection('S')).toBe(true);
    expect(isDirection('W')).toBe(true);
  });

  it('isDirection should return false for invalid directions', () => {
    expect(isDirection('X')).toBe(false);
    expect(isDirection('north')).toBe(false);
  });

  it('isCommand should return true for valid commands', () => {
    expect(isCommand('L')).toBe(true);
    expect(isCommand('R')).toBe(true);
    expect(isCommand('M')).toBe(true);
  });

  it('isCommand should return false for invalid commands', () => {
    expect(isCommand('X')).toBe(false);
    expect(isCommand('move')).toBe(false);
  });
});