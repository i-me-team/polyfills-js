// Read the blog as well: https://mandy8055.github.io/blog/any-and-aggregate-error-in-promise
export function any(promises) {
  function executorFunction(resolve, reject) {
    // edge case
    let rejectedCount = promises.length;
    const errors = [];
    if (rejectedCount === 0) {
      reject(new AggregateError('All promises were rejected'));
      return;
    }
    promises.forEach((promise, idx) => {
      promise.then(resolve).catch((error) => {
        errors[idx] = error;
        if (--rejectedCount === 0) {
          reject(new AggregateError('All promises were rejected', errors));
        }
      });
    });
  }
  return new Promise(executorFunction);
}
