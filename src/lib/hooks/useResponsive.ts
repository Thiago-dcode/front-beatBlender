"use client";

import { useState, useEffect, useCallback } from "react";
type Device = {
  isPhone: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTv: boolean;
  width: number;
  height: number;
};
function useResponsive() {
  const checkDevice = useCallback(
    (width: number, height: number) => ({
      isPhone: width <= 480,
      isTablet: width > 480 && width <= 768,
      isDesktop: width > 769 && width <= 1200,
      isTv: width > 1200,
      width,
      height,
    }),
    []
  );
  const [device, setDevice] = useState<Device>({
    isPhone: false,
    isDesktop: false,
    isTablet: false,
    isTv: false,
    height: 0,
    width: 0,
  });

  const handleResize = useCallback(() => {
    setDevice(checkDevice(window.innerWidth, window.innerHeight));
  }, [checkDevice]);

  useEffect(() => {
    if (!window) return;
    setDevice(checkDevice(window.innerWidth, window.innerHeight));
    globalThis.addEventListener("resize", handleResize);
    return () => globalThis.removeEventListener("resize", handleResize);
  }, [handleResize, checkDevice]);

  return device;
}

export default useResponsive;
