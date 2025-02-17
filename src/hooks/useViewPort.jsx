//custom hook lay thong tin ve kich thuoc cua viewport

import React, { useEffect, useState } from "react";

const useViewPort = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  return { width };
};

export default useViewPort;
