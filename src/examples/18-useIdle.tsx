import React from "react";
import { useIdle } from "./hooks/useIdle";

export default () => {
  const isIdle = useIdle(3000);

  return (
    <div>
      <div>User is idle: {isIdle ? "Yes 😴" : "Nope"}</div>
    </div>
  );
};
