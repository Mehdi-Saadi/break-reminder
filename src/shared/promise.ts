export const promiseHandler = async <T>(asyncFn: Promise<T>): Promise<[undefined, T] | [Error]> => {
  try {
    return [undefined, await asyncFn];
  } catch (error) {
    return [error] as [Error];
  }
};
