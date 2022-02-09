import { DependencyList, useMemo, useState } from "react";

export interface StableActions<T extends object> {
  set: <K extends string>(key: K, value: any) => void;
  reset: () => void;
  setAll: <T2 extends T>(newMap: T2) => void;
  remove: <K extends keyof T>(key: K) => void;
}

export const useMap = <T extends object>(
  initialState: T
): [T, StableActions<T>] => {
  const [map, setMap] = useState(initialState);

  const actions = useMemo<StableActions<T>>(
    () => ({
      set: (key, value) => {
        setMap((prevMap) => ({
          ...prevMap,
          [key]: value,
        }));
      },
      reset: () => setMap(initialState),
      setAll: (newMap) => setMap(newMap),
      remove: (key) => {
        setMap((prevMap) => {
          const { [key]: omit, ...rest } = prevMap;
          return rest as T;
        });
      },
    }),
    []
  );

  return [map, actions];
};
