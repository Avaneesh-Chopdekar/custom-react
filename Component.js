import { useState, useEffect, useMemo } from "./MyReact.js";

export function Component({ propCount, buttonElement }) {
  const [count, setCount] = useState(10);
  const propCountDoubled = useMemo(() => {
    console.log("In Memo");
    return propCount * 2;
  }, [propCount]);

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
