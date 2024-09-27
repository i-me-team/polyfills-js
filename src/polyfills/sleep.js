/**
 * Why it(sleep behavior) wasn't possible before await?
 * Before async/await was introduced, JavaScript didn't have a built-in way to pause execution synchronously.
 * The language is single-threaded and non-blocking,
 * which means it couldn't just stop and wait without blocking the entire program.
 *
 * What happens behind the scenes with async/await?
 * 1. async functions always return a Promise.
 * 2. When an await keyword is encountered, it suspends the execution of the async function and waits for the Promise to resolve.
 * 3. The JavaScript engine can continue executing other code while waiting for the Promise to resolve.
 * 4. Once the Promise resolves, the async function resumes execution from where it left off.
 *
 * @param {number} ms
 * @returns {Promise<any>}
 */

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

(async function example() {
  console.log('Start');
  await sleep(2000);
  console.log('End');
})();
