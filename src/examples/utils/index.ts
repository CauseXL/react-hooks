export const on = <T extends Window | Document | HTMLElement>(
  obj: T,
  ...args: Parameters<T["addEventListener"]>
): void => {
  if (obj && obj.addEventListener) {
    obj.addEventListener(
      ...(args as Parameters<HTMLElement["addEventListener"]>)
    );
  }
};

export const off = <T extends Window | Document | HTMLElement>(
  obj: T,
  ...args: Parameters<T["removeEventListener"]>
): void => {
  if (obj && obj.removeEventListener) {
    obj.removeEventListener(
      ...(args as Parameters<HTMLElement["removeEventListener"]>)
    );
  }
};
