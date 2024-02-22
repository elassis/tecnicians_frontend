import { useEffect, useState } from "react";

export const useDevice = () => {
  const isMobile = window.innerWidth < 700;
  return { isMobile };
};
