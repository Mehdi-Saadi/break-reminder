import { describe, it, expect } from 'vitest';
import { objectToQuery } from '@/shared/url';

describe('objectToQuery', () => {
  it('returns expected value from object', () => {
    const obj = {
      first_name: 'Mehdi',
      last_name: 'Saadi',
      age: 21,
      is_alive: true,
      gender: 'Male',
    };

    const queryString = objectToQuery(obj);

    expect(queryString).toBe('?first_name=Mehdi&last_name=Saadi&age=21&is_alive=true&gender=Male');
  });

  it('returns expected value from array', () => {
    const arr = ['Mehdi', 'Saadi', 21, true, 'Male'];

    const queryString = objectToQuery(arr);

    expect(queryString).toBe('?0=Mehdi&1=Saadi&2=21&3=true&4=Male');
  });
});
