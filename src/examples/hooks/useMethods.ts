import { Reducer, ReducerAction, useMemo, useReducer } from "react";

type Action = {
  type: string;
  payload?: any;
};

type CreateMethods<M, T> = (state: T) => {
  [P in keyof M]: () => T;
};

type WrappedMethods<M> = {
  [P in keyof M]: (...payload: any) => void;
};

export const useMethods = <M, T>(
  createMethods: CreateMethods<M, T>,
  initialState: T
): [T, WrappedMethods<M>] => {
  const reducer = useMemo<Reducer<T, Action>>(
    () => (reducerState: T, action: Action) => {
      //@ts-ignore
      return createMethods(reducerState)[action.type](...action.payload);
    },
    [createMethods]
  );

  const [state, dispatch] = useReducer(reducer, initialState);

  const wrappedMethods: WrappedMethods<M> = useMemo(() => {
    const actionTypes = Object.keys(createMethods(initialState));
    return actionTypes.reduce((acc, type) => {
      //@ts-ignore
      acc[type] = (...payload) => dispatch({ type, payload });
      return acc;
    }, {} as WrappedMethods<M>);
  }, [createMethods, initialState]);

  return [state, wrappedMethods];
};
