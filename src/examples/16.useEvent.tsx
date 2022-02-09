import React, { useCallback } from "react";
import { useEvent } from "./hooks/useEvent";

export default () => {
  const onKeyDown = useCallback(() => {
    console.log("===== debug fcd6ea ======");
  }, []);

  useEvent("keydown", onKeyDown);

  return <div>Press some keys on your keyboard</div>;
};
