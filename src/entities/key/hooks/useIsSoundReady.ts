import SoundHandler from "@/lib/core/soundHandler";
import React, { useCallback } from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function useIsSoundReady(
  soundHandler: SoundHandler | undefined
) {
  const [ready, setReady] = useState(false);
  const initKey = useCallback(async () => {
    if (!soundHandler) return;
    try {
      await soundHandler.init();
      setReady(true);
    } catch (error) {
      console.log("KEY ERROR: " + soundHandler.key.displayName, error);
      setReady(false);
    }
  }, [soundHandler]);
  useEffect(() => {
    initKey();
  }, [soundHandler, initKey]);

  return ready;
}
