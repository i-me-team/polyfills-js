/**
 * Given an array containing all kinds of data, please implement a function deduplicate() to remove the duplicates.
 * You should modify the array in place. Order doesn't matter.
 */
export function deduplicate(arr) {
  const tempArray = [...new Set(arr)];
  arr.length = 0;
  arr.push(...tempArray);
}
