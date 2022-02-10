import { on, off } from "examples/utils";
import { RefObject, useEffect, useState } from "react";
import { EventHandler } from "./useEvent";

export interface MouseState {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
}

export const useMouse = (ref: RefObject<Element>) => {
  const [state, setState] = useState<MouseState>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!ref || !ref.current) return;
      const {
        left,
        top,
        width: elW,
        height: elH,
      } = ref.current.getBoundingClientRect();
      const posX = left + window.pageXOffset;
      const posY = top + window.pageYOffset;
      const elX = event.pageX - posX;
      const elY = event.pageY - posY;

      setState({
        docX: event.pageX,
        docY: event.pageY,
        posX,
        posY,
        elX,
        elY,
        elH,
        elW,
      });
    };

    on(document, "mouseover", handler as EventHandler<HTMLElement>[1]);

    return () => {
      off(document, "mouseover", handler as EventHandler<HTMLElement>[1]);
    };
  }, []);

  return state;
};
