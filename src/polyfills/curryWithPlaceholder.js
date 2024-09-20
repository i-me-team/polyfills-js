function curryWithPlaceholder(func) {
  const arity = func.length;
  const { placeholder } = curryWithPlaceholder;
  return function curried(...args) {
    const context = this;
    // base case
    if (arity <= args.length && !args.slice(0, arity).includes(placeholder)) {
      return func.call(context, ...args);
    }
    return function (...remaining) {
      let remainingArrayIdx = 0;
      args = args.map((arg) =>
        arg === placeholder && remainingArrayIdx < remaining.length
          ? remaining[remainingArrayIdx++]
          : arg,
      );
      return curried(...args, ...remaining.slice(remainingArrayIdx));
    };
  };
}

curryWithPlaceholder.placeholder = Symbol();
