import React, { useState } from "react";
import { usePrevious } from "./hooks/usePrevious";

export default () => {
  const [count, setCount] = useState(0);
  const preCount = usePrevious(count);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Pre Count: {preCount}</p>
      <div>
        <button onClick={() => setCount((c) => c + 1)}>inc</button>
        <button onClick={() => setCount((c) => c - 1)}>des</button>
      </div>
    </div>
  );
};
