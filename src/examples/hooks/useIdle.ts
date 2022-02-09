import { off, on } from "examples/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTimeoutFn } from "./useTimeoutFn";

const defaultEvents = [
  "mousemove",
  "mousedown",
  "resize",
  "keydown",
  "touchstart",
  "wheel",
];
const oneMinute = 3600;

export const useIdle = (
  ms: number = oneMinute,
  initialState: boolean = false,
  events: string[] = defaultEvents
): boolean => {
  let timeout: any;
  const [state, setState] = useState(initialState);
  const [isReady, clear, set] = useTimeoutFn(() => {
    if (!state) {
      setState(false);
    }
    clearTimeout(timeout);
    timeout = setTimeout(() => setState(true), ms);
  }, 50);

  useEffect(() => {
    for (let i = 0; i < events.length; i++) {
      on(window, events[i], set);
    }

    return () => {
      for (let i = 0; i < events.length; i++) {
        off(window, events[i], clear);
      }
    };
  }, []);

  return state;
};
