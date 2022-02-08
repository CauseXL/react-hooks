import { DependencyList, useEffect } from "react";
import { useTimeoutFn } from "./useTimeoutFn";

export const useDebounce = (
  fn: Function,
  ms: number,
  deps: DependencyList = []
) => {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);
  useEffect(reset, deps);
  return [isReady, cancel];
};
