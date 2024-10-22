/**
 * Problem Statement:
 * You have to implement a function called `promiseMerge` that can take n number of promises as input.
 * It should return a promise that fulfils with:
 * Summation of all resulting values if the type of all inputs is number.
 * Concatenated value if the type of all inputs is string.
 * Computed value using AND operator if the type of all input is boolean.
 * A new concatenated array if the type of all inputs is array.
 * A new object with all the keys from inputs if the type of all inputs is object.
 */
async function promiseMerge(...args) {
  const results = await Promise.all(args);
  const type = typeof results[0];
  if (!results.every((item) => typeof item === type)) {
    throw new TypeError('Invalid Input');
  }

  switch (type) {
    case 'number':
      return results.reduce((acc, currVal) => acc + currVal, 0);
    case 'string':
      return results.reduce((acc, currVal) => acc + currVal, '');
    case 'boolean':
      return results.reduce((acc, currVal) => acc && currVal, true);
    case 'object':
      if (Array.isArray(results[0])) {
        return [].concat(...results);
      } else {
        return Object.assign({}, ...results);
      }
  }
}

promiseMerge(Promise.resolve(1), Promise.resolve(2)).then((data) =>
  console.log(data),
);

promiseMerge(Promise.resolve('devtools'), Promise.resolve('.tech')).then(
  (data) => console.log(data),
);

promiseMerge(
  Promise.resolve([1, 2, 3]),
  Promise.resolve([4, 5, 6]),
  Promise.resolve([7, 8, 9]),
).then((data) => console.log(data));

promiseMerge(
  Promise.resolve(false),
  Promise.resolve(false),
  Promise.resolve(true),
).then((data) => console.log(data));

promiseMerge(
  Promise.resolve({ a: 1 }),
  Promise.resolve({ b: 2 }),
  Promise.resolve({ c: 3 }),
).then((data) => console.log(data));

promiseMerge(
  Promise.resolve({ a: 1 }),
  Promise.resolve({ b: 2 }),
  Promise.resolve(2),
).then((data) => console.log(data));
