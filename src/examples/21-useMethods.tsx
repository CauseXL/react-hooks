import React, { useState } from "react";
import { useMethods } from "./hooks/useMethods";

const initialState = {
  count: 0,
};
//@ts-ignore
function createMethods(state) {
  return {
    reset() {
      return initialState;
    },
    increment() {
      return { ...state, count: state.count + 1 };
    },
    decrement() {
      return { ...state, count: state.count - 1 };
    },
  };
}

export default () => {
  const [state, methods] = useMethods(createMethods, initialState);

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={methods.decrement}>-</button>
      <button onClick={methods.increment}>+</button>
    </>
  );
};
