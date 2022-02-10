import React, { useEffect } from "react";
import { useScroll } from "./hooks/useScroll";

export default () => {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  return (
    <div ref={scrollRef}>
      <div>x: {x}</div>
      <div>y: {y}</div>
    </div>
  );
};
