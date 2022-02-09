import { on, off } from "examples/utils";
import { useEffect } from "react";

type EventHandler<T extends Window | Document | HTMLElement> = Parameters<
  T["addEventListener"]
>;

export const useEvent = <T extends Window | Document | HTMLElement>(
  name: EventHandler<T>[0],
  handler: EventHandler<T>[1],
  target: Window | null = window
) => {
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!target) {
      return;
    }
    on(target, name, handler);
    return () => {
      off(target, name, handler);
    };
  }, []);
};
