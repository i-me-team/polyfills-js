function fibonacci(n) {
  // base case
  if (n === 0 || n === 1) return n;
  // main
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.time();
console.log(fibonacci(5));
console.timeEnd();

// utility function
function memo(func) {
  const cache = new Map();
  return function (...args) {
    const context = this;
    const key = JSON.stringify(args);
    if (!cache.has(key)) {
      cache.set(key, func.call(context, ...args));
    }
    return cache.get(key);
  };
}

const fibonacciWithMemo = memo(fibonacci);

console.time();
console.log(fibonacciWithMemo(5));
console.timeEnd();
