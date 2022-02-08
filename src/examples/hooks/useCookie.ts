import { useCallback, useState } from "react";
import Cookies from "js-cookie";

export const useCookie = (
  cookieName: string
): [
  string | null,
  (newValue: string, options?: Cookies.CookieAttributes) => void,
  () => void
] => {
  /** () => fn for render only once */
  const [value, setValue] = useState(() => Cookies.get(cookieName) || null);

  const updateCookie = useCallback(
    (newValue, options?: Cookies.CookieAttributes) => {
      Cookies.set(cookieName, newValue, options);
      setValue(newValue);
    },
    [cookieName]
  );

  const deleteCookie = useCallback(() => {
    Cookies.remove(cookieName);
    setValue(null);
  }, [cookieName]);

  return [value, updateCookie, deleteCookie];
};
