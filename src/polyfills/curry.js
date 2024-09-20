function add(a, b) {
  return a + b;
}

// curry utility
function curry(func) {
  const arity = func.length;
  return function curried(...args) {
    const context = this;
    // base case
    if (args.length >= arity) {
      return func.call(context, ...args);
    }
    // main case
    return function (...remaining) {
      return curried(...args, ...remaining);
    };
  };
}

const curriedAdd = curry(add);

// console.log(add(2, 5));
// console.log(add(2, 7));
// console.log(add(2, 9));
// const add2 = add(2);
// console.log(add2(5));
// console.log(add2(7));
// console.log(add2(9));

console.log(curriedAdd(2)(5));
