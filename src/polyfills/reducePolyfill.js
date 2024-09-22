Array.prototype.myReduce = function () {
  const arr = this;
  const len = arr.length;
  const callback = arguments[0];
  const hasInitValue = arguments.length === 2;
  // edge case 1
  if (typeof callback !== 'function') {
    throw new TypeError(`${typeof callback} ${callback} is not a function`);
  }
  // edge case 2
  let accumulator;
  let idx = 0;
  if (hasInitValue) {
    accumulator = arguments[1];
  } else {
    if (len === 0) {
      throw new TypeError('Reduce of empty array with no initial value');
    } else {
      accumulator = arr[idx++];
    }
  }
  while (idx < len) {
    accumulator = callback(accumulator, arr[idx], idx, arr);
    idx++;
  }
  return accumulator;
};
