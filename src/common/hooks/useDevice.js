import { useState } from "react";

export const useDevice = () => {
  const [size, setSize] = useState(window.innerWidth);

  window.addEventListener("resize", function () {
    setSize(window.innerWidth);
  });

  let isMobile = size < 700;

  return { isMobile };
};
