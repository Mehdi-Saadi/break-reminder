import { describe, it, expect } from 'vitest';
import { objectToQuery } from '@/shared/url';

describe('objectToQuery', () => {
  it('returns expected value', () => {
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
});
