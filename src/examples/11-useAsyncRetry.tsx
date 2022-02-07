import React from "react";
import { useAsyncRetry } from "./hooks/useAsyncFn";
import { FunctionReturningPromise } from "./types";

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const fetchApi: FunctionReturningPromise = async (url: string) => {
  await sleep(2000);
  const response = await fetch(url);
  const result = await response.text();
  return result;
};

export default ({ url = "aa" }: { url: string }) => {
  const { value, loading, error, retry } = useAsyncRetry(
    () => fetchApi(url),
    [url]
  );
  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>Value: {value}</div>
      )}
      <button onClick={() => retry()}>Retry</button>
    </div>
  );
};
