import React, { useRef } from "react";
import { useMouse } from "./hooks/useMouse";

export default () => {
  const ref = useRef(null);
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(ref);

  return (
    <div ref={ref}>
      <div>
        Mouse position in document - x:{docX} y:{docY}
      </div>
      <div>
        Mouse position in element - x:{elX} y:{elY}
      </div>
      <div>
        Element position- x:{posX} y:{posY}
      </div>
      <div>
        Element dimensions - {elW}x{elH}
      </div>
    </div>
  );
};
