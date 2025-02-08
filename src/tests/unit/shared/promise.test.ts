import { promiseHandler } from '@/shared/promise';
import { describe, it, expect } from 'vitest';

const resolvePromise = <T>(value: T): Promise<Awaited<T>> => Promise.resolve(value);
const rejectPromise = (error: Error): Promise<never> => Promise.reject(error);

describe('promiseHandler', () => {
  it('should resolve and return the expected value', async () => {
    const value = 'Success';
    const result = await promiseHandler(resolvePromise(value));
    expect(result).toEqual([undefined, value]);
  });

  it('should catch and return an error when the promise rejects', async () => {
    const error = new Error('Something went wrong');
    const result = await promiseHandler(rejectPromise(error));
    expect(result).toEqual([error]);
  });

  it('should handle numeric values', async () => {
    const value = 42;
    const result = await promiseHandler(resolvePromise(value));
    expect(result).toEqual([undefined, value]);
  });

  it('should handle object values', async () => {
    const value = { message: 'Hello World!' };
    const result = await promiseHandler(resolvePromise(value));
    expect(result).toEqual([undefined, value]);
  });
});
