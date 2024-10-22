/**
 * Imagine you are making an API call and the request keeps failing,
 * rather than keep on bombarding the server, we can halt the request sending for a certain time.
 * That is how a circuit breaker works.
 * Implement a function that will halt the operation for X amount of time if it fails for Y count.
 */

export function circuitBreaker(func, failureThreshold, resetTimeout) {
  let failureCount = 0;
  let nextAttempt = Date.now();
  let isOpen = false; // initially closed
  return function (...args) {
    if (isOpen) {
      if (Date.now() > nextAttempt) {
        // Ready to retry again
        isOpen = false;
        failureCount = 0;
      } else {
        console.error('Circuit open - Service unavailable');
        return;
      }
    }

    try {
      const result = func(...args);
      failureCount = 0;
      return result;
    } catch (err) {
      if (++failureCount >= failureThreshold) {
        isOpen = true;
        nextAttempt = Date.now() + resetTimeout;
      }
      console.error(err.message);
    }
  };
}

function testerFunction(name) {
  let count = 0;
  return function () {
    if (++count < 5) {
      throw new Error('Slow connection');
    } else {
      console.log(`Hello There! ${name}`);
    }
  };
}

const func = testerFunction('Manuj');
const cb = circuitBreaker(func, 4, 3000);

cb(); // Error
cb(); // Error
cb(); // Error
cb(); // Error
cb(); // Service unavailable
cb(); // Service unavailable
setTimeout(() => cb(), 3000);
