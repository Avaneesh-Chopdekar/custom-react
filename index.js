import { render } from "./MyReact.js";
import { Component } from "./Component.js";

function renderComponent() {
  render(Component, { propCount: 5 }, document.getElementById("root"));
}

renderComponent();
