import { off, on } from "examples/utils";
import { RefObject, useEffect } from "react";

const defaultEvents = ["mousedown", "touchstart"];

export const useClickAway = (
  ref: RefObject<HTMLElement | null>,
  onClickAway: (event: Event) => void,
  events: string[] = defaultEvents
) => {
  useEffect(() => {
    const handler = (event: Event) => {
      const { current: el } = ref;
      el && !el.contains(event.target as Element) && onClickAway(event);
    };

    for (const eventName of events) {
      on(document, eventName, handler);
    }

    return () => {
      for (const eventName of events) {
        off(document, eventName, handler);
      }
    };
  }, [events, onClickAway, ref]);
};
