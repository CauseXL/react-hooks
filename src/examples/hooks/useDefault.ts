import { useState } from "react";

export const useDefault = <T>(defaultValue: T, initialValue: T | (() => T)) => {
  const [value, setValue] = useState<T | null | undefined>(initialValue);
  if (value === undefined || value === null) {
    return [defaultValue, setValue] as const;
  }
  return [value, setValue] as const;
};
