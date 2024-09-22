export function* tokenize(str) {
  const tokens = str.match(/(?:\d+|[+*/()-])/g);
  for (let token of tokens) {
    yield token;
  }
}
