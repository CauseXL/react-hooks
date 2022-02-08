import { useCallback, useEffect, useRef } from "react";

export type UseTimeoutFnReturn = [() => boolean | null, () => void, () => void];

export const useTimeoutFn = (
  fn: Function,
  ms: number = 0
): UseTimeoutFnReturn => {
  const timeout = useRef<ReturnType<typeof setTimeout>>();

  const isReady = () => true;

  const set = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      fn();
    }, ms);
  }, [fn, ms]);

  const clear = useCallback(() => {
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    set();

    return clear;
  }, [clear, set, ms]);

  return [isReady, clear, set];
};
