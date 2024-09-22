/**
 * HTML
 <input type="text" placeholder="Search something..." />
 <p></p>
 <div></div>
 <span></span>
 */

/**
 * CSS
 * 
  div {
    border: 2px solid black;
    width: 120px;
    height: 120px;
    margin-top: 50px;
  }
 */

const inputEl = document.querySelector('input');
const pEl = document.querySelector('p');
const divEl = document.querySelector('div');
const spanEl = document.querySelector('span');

function searchHandler(e) {
  pEl.textContent = e.target.value;
  // computation heavy
}

function mouseMoveHandler(e) {
  spanEl.textContent = `x: ${e.x}, y: ${e.y}`;
}

const debouncedSearchHandler = debounce(searchHandler, 500);
const throttledMouseMoveHandler = throttle(mouseMoveHandler, 1000);

inputEl.addEventListener('input', debouncedSearchHandler);
divEl.addEventListener('mousemove', throttledMouseMoveHandler);

// Utility
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.call(context, ...args);
    }, delay);
  };
}

function throttle(func, delay) {
  let isCooling = false;
  let prevArgs = null;
  let prevThis = null;
  return function throttled(...args) {
    if (!isCooling) {
      func.call(this, ...args);
      isCooling = true;
      setTimeout(() => {
        isCooling = false;
        if (prevArgs) {
          throttled.call(prevThis, ...prevArgs);
          prevArgs = prevThis = null;
        }
      }, delay);
    } else {
      prevArgs = args;
      prevThis = this;
    }
  };
}
