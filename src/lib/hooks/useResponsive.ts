"use client";

import { useState, useEffect, useCallback } from "react";

function useResponsive() {
  const checkDevice = useCallback(
    () => ({
      isPhone: globalThis.innerWidth <= 480,
      isTablet: globalThis.innerWidth > 480 && globalThis.innerWidth <= 768,
      isDesktop: globalThis.innerWidth > 769 && globalThis.innerWidth <= 1200,
      isTv: globalThis.innerWidth > 1200,
    }),
    []
  );

  const [device, setDevice] = useState(checkDevice);

  const handleResize = useCallback(() => {
    setDevice(checkDevice());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    setDevice(checkDevice());

    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return device;
}

export default useResponsive;
