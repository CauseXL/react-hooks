import React, { useState } from "react";
import { useKey } from "./hooks/useKey";

export default () => {
  const [count, set] = useState(0);
  const increment = () => set((count) => ++count);

  useKey("ArrowUp", increment);

  return <div>Press arrow up: {count}</div>;
};
