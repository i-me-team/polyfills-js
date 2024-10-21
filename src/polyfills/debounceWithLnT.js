export function debounce(
  func,
  wait,
  option = { leading: false, trailing: true },
) {
  const { leading, trailing } = option;
  let timerId;
  let isLeadingCalled = false;
  return function (...args) {
    const context = this;
    // Clear existing timer if any
    if (timerId) {
      clearTimeout(timerId);
    }

    if (leading && !timerId) {
      func.call(context, ...args);
      isLeadingCalled = true;
    } else {
      isLeadingCalled = false;
    }

    timerId = setTimeout(() => {
      if (trailing && !isLeadingCalled) {
        func.call(context, ...args);
      }
      timerId = null; // Reset for next debounce sequence
    }, wait);
  };
}
