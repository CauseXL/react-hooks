import React, { useRef } from "react";
import { useClickAway } from "./hooks/useClickAway";

export default () => {
  const ref = useRef(null);
  useClickAway(ref, () => {
    console.log("OUTSIDE CLICKED");
  });
  return (
    <div
      ref={ref}
      style={{
        width: 200,
        height: 200,
        background: "red",
      }}
    />
  );
};
