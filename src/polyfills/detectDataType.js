export function detectDataTypeJS(data) {
  if (data === null) return 'null';
  if (data === undefined) return 'undefined';
  return data.constructor.name.toLowerCase();
}
