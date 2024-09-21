// Read the blog as well: https://mandy8055.github.io/blog/race-method-in-promise
export function race(promises) {
  function executorFunction(resolve, reject) {
    promises.forEach((promise) => promise.then(resolve, reject));
  }
  return new Promise(executorFunction);
}
