"use client";

import { useState, useEffect } from "react";

function useResponsive() {

  const checkDevice = () => ({
    isPhone: globalThis.innerWidth <= 768,
    isTablet: globalThis.innerWidth > 768 && globalThis.innerWidth <= 1024,
    isDesktop: globalThis.innerWidth > 1024,
  });

  const [device, setDevice] = useState(checkDevice);

  const handleResize = () => {
    setDevice(checkDevice());
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
   
    setDevice(checkDevice());

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(()=>{
    console.log('DEVICE',device, globalThis.innerWidth)
  },[device])
  return device;
}

export default useResponsive;
