export function recursiveBinarySearch(arr, k) {
  const low = 0;
  const high = arr.length - 1;
  function recBs(low, high) {
    // base case
    if (low > high) {
      return -1;
    }
    // main case
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === k) {
      return mid;
    } else if (arr[mid] < k) {
      return recBs(mid + 1, high);
    } else {
      return recBs(low, mid - 1);
    }
  }
  return recBs(low, high);
}
