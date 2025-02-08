import { describe, it, expect } from 'vitest';
import { generateRandomAlphabeticId } from '../crypto';

describe('generateRandomAlphabeticId', () => {
  it('returns an id with expected length', () => {
    expect(generateRandomAlphabeticId()).length(16);
  });

  it('returns an id with expected length', () => {
    expect(generateRandomAlphabeticId(32)).length(32);
  });
});
