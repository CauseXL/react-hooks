import { useCallback, useRef, useState } from "react";

export const useGetSetState = <T extends Object>(
  initialState: T = {} as T
): [() => T, (patch: Partial<T>) => void] => {
  const state = useRef({ ...initialState });
  const [update, setUpdate] = useState(0);
  const get = useCallback(() => {
    return state.current;
  }, []);

  const set = useCallback((patch) => {
    if (!patch) return;
    Object.assign(state.current, patch);
    setUpdate((u) => u + 1);
  }, []);

  return [get, set];
};
