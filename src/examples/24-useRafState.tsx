import React, { useEffect } from "react";
import { useRafState } from "./hooks/useRafState";

export default () => {
  const [state, setState] = useRafState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const onResize = () => {
      setState({
        // @ts-ignore
        width: window.clientWidth,
        // @ts-ignore
        height: window.height,
      });
    };

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  });

  return <pre>{JSON.stringify(state, null, 2)}</pre>;
};
