export default function flattenObject(obj, delim = '.') {
  const res = {};

  const recurse = (val, path) => {
    // base case
    if (Object(val) !== val) {
      // isPrimitive
      res[path] = val;
      return;
    }
    // main case
    for (let [k, v] of Object.entries(obj)) {
      const newPath = path ? `${path}${delim}${k}` : k;
      recurse(v, newPath);
    }
  };

  recurse(obj, '');
  return res;
}

// To Test:
const response = {
  name: 'John',
  age: 26,
  characterstics: {
    height: '6 feet',
    complexion: 'dark',
    hair: 'black',
  },
  2: 'Hi There',
  true: 'Hey',
  techStack: {
    language: 'Javascript',
    framework: {
      name: 'React',
      version: '18',
    },
  },
};
console.log(flattenObject(response, '_'));
