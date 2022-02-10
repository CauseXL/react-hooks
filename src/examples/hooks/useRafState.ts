import {
  useCallback,
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

export const useRafState = <T>(
  initialState: T
): [T, Dispatch<SetStateAction<T>>] => {
  let frame = useRef(0);
  const [state, setState] = useState(initialState);

  const setRafState = useCallback((value) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      setState(value);
    });
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(frame.current);
    };
  });

  return [state, setRafState];
};
