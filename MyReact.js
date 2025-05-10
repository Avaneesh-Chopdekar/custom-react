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
  const parent = globalParent;
  globalId++;

  return (() => {
    const { cache } = componentState.get(parent);
    if (cache[id] == null) {
      cache[id] = {
        value:
          typeof initialState === "function" ? initialState() : initialState,
      };
    }

    const setState = (value) => {
      const { props, component } = componentState.get(parent);
      if (typeof value === "function") {
        cache[id].value = value(cache[id].value);
      } else {
        cache[id].value = value;
      }
      render(component, props, parent);
    };
    return [cache[id].value, setState];
  })();
}

export function useEffect(callback, dependencies) {
  const id = globalId;
  const parent = globalParent;
  globalId++;

  return (() => {
    const { cache } = componentState.get(parent);
    if (cache[id] == null) {
      cache[id] = { dependencies: undefined };
    }

    const dependenciesChanged =
      dependencies == null ||
      dependencies.some((dep, i) => {
        return (
          cache[id].dependencies == null || dep !== cache[id].dependencies[i]
        );
      });

    if (dependenciesChanged) {
      if (cache[id].cleanup != null) cache[id].cleanup();
      cache[id].cleanup = callback();
      cache[id].dependencies = dependencies;
    }
  })();
}
