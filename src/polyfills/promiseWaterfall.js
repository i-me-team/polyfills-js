/*
Implement a function `promiseWaterfall` that takes an array of functions returning promises as arguments. The functions represent tasks that depend on the result of the previous task. The function should execute the tasks sequentially, passing the result of each task to the next task, similar to `Array.prototype.reduce()`. The function should return a promise that resolves with the final result of the last task.
*/

export async function promiseWaterfall(funcs) {
  const firstResult = await funcs[0]();
  return funcs.slice(1).reduce(async (a, func) => func(await a), firstResult);
}

// Example usage:
const task1 = async () => 'Task 1 result';
const task2 = async (prevResult) => `${prevResult}, Task 2 result`;
// const task3 = async (prevResult) => {
//   throw new Error('Task 3 failed');
// };
const task4 = async (prevResult) => `${prevResult}, Task 4 result`;

// promiseWaterfall([task1, task2, task3, task4])
promiseWaterfall([task1, task2, task4])
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error(error.message);
  });
