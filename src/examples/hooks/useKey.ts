import { DependencyList, useMemo } from "react";
import { useEvent } from "./useEvent";

export type KeyPredicate = (event: KeyboardEvent) => boolean;
export type Handler = (event: KeyboardEvent) => void;

export interface UseKeyOptions {
  event?: "keydown" | "keypress" | "keyup";
  target?: any;
  options?: any;
}

const createKeyPredicate = (keyFilter: string): KeyPredicate =>
  typeof keyFilter === "string"
    ? (event: KeyboardEvent) => event.key === keyFilter
    : () => true;

export const useKey = (
  key: string,
  fn: EventListener,
  opts: UseKeyOptions = {},
  deps: DependencyList = [key]
) => {
  const { event = "keydown", target } = opts;
  const useMemoHandler = useMemo(() => {
    const predicate = createKeyPredicate(key);
    const handler: Handler = (handlerEvent) => {
      if (predicate(handlerEvent)) {
        return fn(handlerEvent);
      }
    };
    return handler;
  }, deps);
  useEvent(event, useMemoHandler as EventListener, target);
};
