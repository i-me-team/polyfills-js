/**
 * Given an array of integers, move zeros to the end while keeping the order of the rest.
 * You should make the in-place change.
 * @param {*} arr
 */
export function moveZeros(arr) {
  let i = 0;
  let j = 0;
  while (i < arr.length) {
    if (arr[i] !== 0) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      j++;
    }
    i++;
  }
}
