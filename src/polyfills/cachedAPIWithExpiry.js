/**
 * Problem statement:
 * Implement a function in JavaScript that caches the API response for the given amount of time.
 * If a new call is made between that time, the response from the cache will be returned,
 * else a fresh API call will be made.
 */

export function cachedApiCall(time) {
  const cache = new Map();
  return async function (resource, options = {}) {
    const key = `${resource}-${JSON.stringify(options)}`;
    if (!cache.has(key) || cache.get(key).expiry < Date.now()) {
      console.log('Making a fresh API call...');
      try {
        const response = await fetch(resource, options);
        const value = await response.json();
        const result = { value, expiry: Date.now() + time };
        cache.set(key, result);
      } catch (err) {
        console.error(err);
      }
    }
    return cache.get(key).value;
  };
}

// Driver code
const call = cachedApiCall(1500);
call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) =>
  console.log(a),
);
// setTimeout(() => {
//   call("https://jsonplaceholder.typicode.com/todos/1", {}).then((a) =>
//     console.log(a)
//   );
// }, 700);

setTimeout(() => {
  call('https://jsonplaceholder.typicode.com/todos/1', {}).then((a) =>
    console.log(a),
  );
}, 2000);
