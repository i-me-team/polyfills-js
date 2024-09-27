const React = (function () {
  let _val = [],
    _idx = 0;
  function useState(initVal) {
    const state = _val[_idx] ?? initVal;
    const idx = _idx;
    function setState(newVal) {
      _val[idx] = newVal;
    }
    _idx++;
    return [state, setState];
  }

  function useEffect(callback, deps) {
    const oldDeps = _val[_idx];
    let shouldRender = true;
    if (oldDeps) {
      shouldRender = deps.some((dep, idx) => !Object.is(oldDeps[idx], dep));
    }
    shouldRender && callback();
    _val[_idx] = deps;
  }

  function renderDOM(Comp) {
    const c = Comp();
    _idx = 0;
    c.render();
    return c;
  }
  return {
    useState,
    useEffect,
    renderDOM,
  };
})();

// Usage Example
function Component() {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState('Batman');

  React.useEffect(() => {
    console.log('I got rerendered');
  }, [name]);

  return {
    render: () => console.log(`Count: ${count}, Name: ${name}`),
    click: () => setCount(count + 1),
    change: (newName) => setName(newName),
  };
}

let app = React.renderDOM(Component);
app.click();
app = React.renderDOM(Component);
app.change('Wonderwoman');
app = React.renderDOM(Component);
app = React.renderDOM(Component);
