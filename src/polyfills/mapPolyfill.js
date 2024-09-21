export function myMap(callback, context) {
  const arr = this;
  const len = arr.length;
  // edge case
  if (typeof callback !== 'function') {
    throw new TypeError(`${typeof callback} ${callback} is not a function`);
  }
  const result = new Array(len);
  for (let i = 0; i < len; i++) {
    if (i in arr) {
      result[i] = callback.call(context, arr[i], i, arr);
    }
  }
  return result;
}
