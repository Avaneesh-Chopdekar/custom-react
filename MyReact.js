export function render(component, props, parent) {
  const element = component(props);
  parent.innerText = element;
}
