import { DependencyList, useCallback, useEffect, useState } from "react";
import { FunctionReturningPromise, PromiseType } from "../types";

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error | undefined;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type StateFromFunctionReturningPromise<T extends FunctionReturningPromise> =
  AsyncState<PromiseType<ReturnType<T>>>;
type AsyncFnReturn<T extends FunctionReturningPromise> = [
  StateFromFunctionReturningPromise<T>,
  T
];

export const useAsyncFn = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> => {
  const [state, setState] = useState(initialState);

  const callBack = useCallback((...args) => {
    console.log("===== debug 3d698f ======", args);
    setState((prevState) => ({ ...prevState, loading: true }));
    return fn(...args).then(
      (value) => {
        setState({ value, loading: false });
        return value;
      },
      (error) => {
        setState({ error, loading: false });
        return error;
      }
    ) as ReturnType<T>;
  }, deps);

  return [state, callBack as unknown as T];
};

export const useAsync = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) => {
  const [state, callBack] = useAsyncFn(fn, deps, { loading: true });

  useEffect(() => {
    callBack();
  }, [callBack]);

  return state;
};

export const useAsyncRetry = <T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = []
) => {
  const [count, setCount] = useState(0);
  const state = useAsync(fn, [...deps, count]);
  const loading = state.loading;

  const retry = useCallback(() => {
    if (loading) {
      console.log("===== is loading ======");
      return;
    }
    setCount((c) => c + 1);
  }, [...deps, loading]);

  return {
    ...state,
    retry,
  };
};
