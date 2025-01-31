export const objectToQuery = (obj: Record<string, string | number | boolean>): string => {
  const queryString = Object.entries(obj)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');

  return queryString ? `?${queryString}` : '';
};
