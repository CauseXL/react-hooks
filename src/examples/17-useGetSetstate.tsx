import React from "react";
import { useGetSetState } from "./hooks/useGetSetState";

export default () => {
  const [get, setState] = useGetSetState({ cnt: 0 });
  console.log("===== debug 0f4acb ======");
  const onClick = () => {
    setTimeout(() => {
      setState({ cnt: get().cnt + 1 });
    }, 1000);
  };

  return <button onClick={onClick}>Clicked: {get().cnt}</button>;
};
