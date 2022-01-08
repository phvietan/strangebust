export function parseHeaderMap(
  headers: string[],
): Record<string, string> {
  const result: Record<string, string> = {};
  headers.forEach((header) => {
    const delimiter = header.indexOf(': ');
    if (delimiter === -1) return;
    const key = header.slice(0, delimiter);
    const value = header.slice(delimiter + 2);
    if (key.toLowerCase() === 'content-length') return;
    result[key] = value;
  });
  return result;
}