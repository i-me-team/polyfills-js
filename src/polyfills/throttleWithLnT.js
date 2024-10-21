export function throttle(
  func,
  wait,
  option = { leading: true, trailing: true },
) {
  let isCooling = false;
  let lastArgs = null;
  return function (...args) {
    const context = this;
    const { leading, trailing } = option;

    const startCoolingPhase = () =>
      setTimeout(() => {
        if (trailing && lastArgs) {
          func.call(context, ...lastArgs);
          lastArgs = null;
          startCoolingPhase();
        } else {
          isCooling = false;
        }
      }, wait);

    if (!isCooling) {
      isCooling = true;
      if (leading) {
        func.call(context, ...args);
      } else {
        lastArgs = args; // Save arguments for the trailing call if leading is false
      }
      startCoolingPhase();
    } else {
      lastArgs = args; // Always save the latest arguments for trailing execution
    }
  };
}
