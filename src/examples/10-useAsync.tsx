import React, { FC } from "react";
import { useAsyncFn } from "./hooks/useAsyncFn";
import { FunctionReturningPromise } from "./types";
type AdderFn = (a?: number, b?: number) => Promise<number>;

const adder: AdderFn = async (a?, b?) => {
  return (a || 0) + (b || 0);
};

const fetchApi: FunctionReturningPromise = async (url: string) => {
  const response = await fetch(url);
  const result = await response.text();
  return result;
};

export default ({ url = "aa" }: { url: string }) => {
  const [state, fetch] = useAsyncFn(() => fetchApi(url), [url]);
  console.log("===== debug 88c379 ======", state);
  return (
    <div>
      {state.loading ? (
        <div>Loading...</div>
      ) : state.error ? (
        <div>Error: {state.error.message}</div>
      ) : (
        <div>Value: {state.value}</div>
      )}
      <button onClick={() => fetch()}>Start loading</button>
    </div>
  );
};
