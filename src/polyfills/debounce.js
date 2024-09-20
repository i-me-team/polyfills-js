export function debounce(func, wait) {
  let timerId;
  return function (...args) {
    const context = this;
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.call(context, ...args);
    }, wait);
  };
}
