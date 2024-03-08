import SoundHandler from "@/lib/core/soundHandler";
import { KeyboardWithKeysAndDesign } from "@/types";
import { useCallback, useEffect, useState } from "react";

function useSetSoundHandlers(
  keyboard: KeyboardWithKeysAndDesign,
  enableKeyDown: boolean
) {
  const [soundHandlers, setSoundHandlers] = useState<{
    [key: string]: SoundHandler;
  }>();

  const stopAll = useCallback(() => {
    if (!soundHandlers) return;

    keyboard.keys.forEach((key) => {
      const soundHandler = soundHandlers[key.key.toLowerCase()];
      if (soundHandler) {
        soundHandler.pause();
      }
    });
  }, [keyboard.keys, soundHandlers]);

  useEffect(() => {
    console.log("KEYBOARD:", keyboard);
    const _soundHandlers = keyboard.keys.reduce<{
      [key: string]: SoundHandler;
    }>((acc, curr) => {
      const { key, sound } = curr;
      acc[key.toLowerCase()] = new SoundHandler(curr);
      return acc;
    }, {});
    console.log(_soundHandlers);
    setSoundHandlers(_soundHandlers);
  }, [keyboard]);

  useEffect(() => {
    if (!enableKeyDown || !soundHandlers) return;
    const eventOnKeyDown = (e: globalThis.KeyboardEvent) => {
      const soundHandler = soundHandlers[e.key.toLowerCase()];
      if (!soundHandler || !soundHandler.canplay) return;

      soundHandler.keyDown();
    };
    const eventOnKeyUp = (e: globalThis.KeyboardEvent) => {
      const soundHandler = soundHandlers[e.key.toLowerCase()];
      if (!soundHandler) return;
      if (!soundHandler || !soundHandler.canplay) return;
      soundHandler.keyUp();
    };

    document.addEventListener("keydown", eventOnKeyDown);
    document.addEventListener("keyup", eventOnKeyUp);
    return () => {
      document.removeEventListener("keydown", eventOnKeyDown);
      document.removeEventListener("keyup", eventOnKeyUp);
      stopAll();
    };
  }, [soundHandlers, enableKeyDown]);

  return soundHandlers;
}

export default useSetSoundHandlers;
