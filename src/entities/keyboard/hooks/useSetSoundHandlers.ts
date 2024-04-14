import SoundHandler from "@/lib/core/soundHandler";
import { key } from "@/types";
import { useCallback, useEffect, useState } from "react";

function useSetSoundHandlers(keys: key[] | undefined, enableKeyDown: boolean) {
  const [soundHandlers, setSoundHandlers] = useState<{
    [key: string]: SoundHandler;
  }>();
  const [eventIsRunning, setEventIsRunning] = useState(false);
  const [_enableKeyDown, setEnableKeyDown] = useState(enableKeyDown);
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
    if (!_keys) {
      setSoundHandlers(undefined);
      return;
    }

    const _soundHandlers = _keys.reduce<{
      [key: string]: SoundHandler;
    }>((acc, curr) => {
      const { key, id, sound } = curr;
      const soundHandler = new SoundHandler(curr);
      acc[key.toLowerCase()] = soundHandler;
      return acc;
    }, {});

    setSoundHandlers(_soundHandlers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_keys]);

  useEffect(() => {
    if (!soundHandlers) return;

    const eventOnKeyDown = (e: globalThis.KeyboardEvent) => {
      setEventIsRunning(true);
      const soundHandler = soundHandlers[e.key.toLowerCase()];
      if (!soundHandler || !soundHandler.isConnected || !_enableKeyDown) return;

      soundHandler.keyDown();
    };
    const eventOnKeyUp = (e: globalThis.KeyboardEvent) => {
      setEventIsRunning(true);
      const soundHandler = soundHandlers[e.key.toLowerCase()];

      if (!soundHandler || !soundHandler.isConnected || !_enableKeyDown) return;
      soundHandler.keyUp();
    };

    if (!_enableKeyDown) {
      document.removeEventListener("keydown", eventOnKeyDown);
      document.removeEventListener("keyup", eventOnKeyUp);
      stopAll();
      setEventIsRunning(false);
      return;
    }

    document.addEventListener("keydown", eventOnKeyDown);
    document.addEventListener("keyup", eventOnKeyUp);

    return () => {
      document.removeEventListener("keydown", eventOnKeyDown);
      document.removeEventListener("keyup", eventOnKeyUp);
      stopAll();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundHandlers, _enableKeyDown]);

  return {
    soundHandlers,
    setKeys,
    keys: _keys,
    setEnableKeyDown,
    enableKeyDown: _enableKeyDown,
  };
}

export default useSetSoundHandlers;
