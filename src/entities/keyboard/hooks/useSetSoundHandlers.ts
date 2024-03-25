import SoundHandler from "@/lib/core/soundHandler";
import { key } from "@/types";
import { useCallback, useEffect, useState } from "react";

function useSetSoundHandlers(keys: key[] | undefined, enableKeyDown: boolean) {
  const [soundHandlers, setSoundHandlers] = useState<{
    [key: string]: SoundHandler;
  }>();
  const [_keys, setKeys] = useState(keys);

  const stopAll = useCallback(() => {
    if (!soundHandlers || !_keys) return;

    _keys.forEach((key) => {
      const soundHandler = soundHandlers[key.key.toLowerCase()];
      if (soundHandler) {
        soundHandler.pause();
      }
    });
  }, [_keys, soundHandlers]);

  useEffect(() => {
    if (!_keys) return;
    const _soundHandlers = _keys.reduce<{
      [key: string]: SoundHandler;
    }>((acc, curr) => {
      const { key, sound } = curr;
      acc[key.toLowerCase()] = new SoundHandler(curr);
      return acc;
    }, {});

    setSoundHandlers(_soundHandlers);
  }, [_keys]);

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

  return { soundHandlers, setKeys };
}

export default useSetSoundHandlers;
