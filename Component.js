import { useState, useEffect } from "./MyReact.js";

export function Component({ propCount, buttonElement }) {
  const [count, setCount] = useState(10);
  const propCountDoubled = 0;

  useEffect(() => {
    const handler = () => setCount((c) => c + 1);
    buttonElement.addEventListener("click", handler);

    return () => buttonElement.removeEventListener("click", handler);
  }, [buttonElement]);

  return `
        State: ${count}
        Prop: ${propCount}
        Prop doubled: ${propCountDoubled}
    `;
}
