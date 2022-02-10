import { off, on } from "examples/utils";
import { useEffect, RefObject } from "react";
import { useRafState } from "./useRafState";

export const useScroll = (ref: RefObject<HTMLElement>) => {
  const [state, setState] = useRafState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;

      setState({
        x: ref.current.scrollLeft,
        y: ref.current.scrollTop,
      });
    };
    if (!ref.current) return;
    on(ref.current, "scroll", handler, {
      capture: false,
      passive: true,
    });

    return () => {
      if (!ref.current) return;
      off(ref.current, "scroll", handler);
    };
  }, [ref]);

  return state;
};
