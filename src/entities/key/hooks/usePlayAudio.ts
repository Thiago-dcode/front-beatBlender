import React, { useState } from "react";

export default function usePlayAudio() {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
  const playAudio = (src: string) => {
    if (!(audio instanceof HTMLAudioElement)) return;
    audio.src = src;

    if (audio.paused) {
      audio.play();
    } else {
      audio.currentTime = 0;
      audio.play();
    }
  };

  return playAudio;
}
