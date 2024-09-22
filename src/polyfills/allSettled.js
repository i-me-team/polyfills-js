// Read the blog as well: https://mandy8055.github.io/blog/allSettled-method-in-promise
export function allSettled(promises) {
  function executorFunction(resolve) {
    // edge case
    let promisesToResolve = promises.length;
    const res = [];
    if (promisesToResolve === 0) {
      resolve(res);
      return;
    }
    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((value) => (res[idx] = { status: 'fulfilled', value }))
        .catch((reason) => (res[idx] = { status: 'rejected', reason }))
        .finally(() => {
          if (--promisesToResolve === 0) resolve(res);
        });
    });
  }
  return new Promise(executorFunction);
}
