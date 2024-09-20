// Read about composition before working on this polyfill
export function pipe(funcs) {
  return function (initVal) {
    return funcs.reduce((acc, currFun) => {
      return currFun(acc);
    }, initVal);
  };
}

// Can be shortened as
export const pipeShortened = (fn) => (iv) => fn.reduce((a, c) => c(a), iv);
