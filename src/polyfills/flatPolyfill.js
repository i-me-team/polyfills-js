export function flat(arr, depth = 1) {
  // base case
  if (depth < 1) {
    return arr.slice();
  }
  // main case
  let res = [];
  for (let el of arr) {
    if (Array.isArray(el)) {
      res = res.concat(flat(el, depth - 1));
    } else {
      res.push(el);
    }
  }
  return res;
}
