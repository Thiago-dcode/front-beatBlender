import React, { useEffect, useState } from "react";

function UseTimer(frequency = 1) {
  const [timer, setTimer] = useState(0);
  const [_start, setStart] = useState(false);
  const [intervalIsSet, setIntervalIsSet] = useState(false)
  const [handler, setHandler] = useState<{
    condition: number,
    callback: () => void
  } | undefined>(undefined);
  const start = () => {
    setStart(true);
  };

  const stop = () => {
    setStart(false);
  };

  useEffect(() => {
  
    if (intervalIsSet || !_start) return;
    const intervarId = setInterval(() => {
     setIntervalIsSet(true)
      setTimer((prev) => prev + 1);
    }, 1000 * frequency);
    () => {
      return clearInterval(intervarId);
    };
  }, [_start, frequency,intervalIsSet]);

  useEffect(() => {
    if (!handler) return;
     const {condition,callback} = handler
     if(timer !== condition) return
     callback()
  }, [ handler,timer]);

  return { timer, start, stop, setHandler };
}

export default UseTimer;
