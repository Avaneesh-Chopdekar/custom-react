let globalId = 0;
let globalParent;
const componentState = new Map();

export function render(component, props, parent) {
  const state = componentState.get(parent) || { cache: [] };
  componentState.set(parent, { ...state, component, props });
  globalParent = parent;
  const output = component(props);
  globalId = 0;
  parent.innerText = output;
}

export function useState(initialState) {
  const id = globalId;
  const { cache, props, component } = componentState.get(globalParent);
  if (cache[id] == null) {
    cache[id] = {
      value: typeof initialState === "function" ? initialState() : initialState,
    };
  }

  globalId++;

  const setState = (value) => {
    if (typeof value === "function") {
      cache[id].value = value(cache[id].value);
    } else {
      cache[id].value = value;
    }
    render(component, props, globalParent);
  };
  return [cache[id].value, setState];
}
