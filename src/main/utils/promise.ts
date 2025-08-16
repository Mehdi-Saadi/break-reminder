export async function handlePromise<T>(asyncFn: Promise<T>): Promise<{ error: null, response: T } | { error: Error, response: null }> {
  try {
    const response = await asyncFn

    return {
      error: null,
      response,
    }
  }
  catch (error) {
    return {
      error: error as Error,
      response: null,
    }
  }
}
