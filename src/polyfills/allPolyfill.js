// Read the blog as well: https://mandy8055.github.io/blog/all-method-in-promise

// Promises array can have non-promise values as well.
export function all(promises) {
  function executorFunction(resolve, reject) {
    // edge case
    let promisesToResolve = promises.length;
    const res = [];
    if (promisesToResolve === 0) {
      resolve(res);
      return;
    }
    promises.forEach((promise, idx) => {
      Promise.resolve(promise).then((rv) => {
        res[idx] = rv;
        if (--promisesToResolve === 0) {
          resolve(res);
        }
      }, reject);
    });
  }
  return new Promise(executorFunction);
}
