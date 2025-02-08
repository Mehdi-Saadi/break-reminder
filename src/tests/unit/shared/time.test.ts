import { Minute, minutesToMilliseconds, minutesToSeconds, Second, secondsToMilliseconds } from '@/shared/time';
import { describe, it, expect } from 'vitest';

describe('minutesToSeconds', () => {
  it('returns expected value', () => {
    expect(minutesToSeconds(30 as Minute)).toBe(1800);
  });
});

describe('secondsToMilliseconds', () => {
  it('returns expected value', () => {
    expect(secondsToMilliseconds(41 as Second)).toBe(41000);
  });
});

describe('minutesToMilliseconds', () => {
  it('returns expected value', () => {
    expect(minutesToMilliseconds(25 as Minute)).toBe(1500000);
  });
});
