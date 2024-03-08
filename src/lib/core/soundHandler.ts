import { LoopEffect, key } from "@/types";
import { setInterval } from "timers";

export default class SoundHandler {
  private readonly audio: HTMLAudioElement;
  private audioRunning: boolean = false;
  canplay = false;
  private keyElement: HTMLElement | null = null;
  private intervalId: ReturnType<typeof globalThis.setTimeout> | undefined =
    undefined;
  constructor(public key: key) {
    this.audio = new Audio();

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
  }

  init() {
    this.audio.src = this.key.sound.soundUrl;
    return new Promise((resolve, reject) => {
      this.audio.addEventListener("canplaythrough", () => {
        this.keyElement = document.getElementById(`div-${this.key.key}`);
        this.canplay = true;
        resolve(true);
      });
    });
  }

  play() {
    if (this.audio.paused) {
      this.audio.play();
    } else {
      this.audio.currentTime = 0;
      this.audio.play();
    }
  }
  pause() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.audio.loop = false;
    globalThis.clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
  loop(effect: LoopEffect) {
    const { bpm } = effect.config;

    console.log("BPM", bpm);
    if (this.audio.loop || this.intervalId) {
      this.pause();
      document
        .getElementById(`loop-effect-${effect.id}`)
        ?.classList.remove("loop");
      return;
    }

    document.getElementById(`loop-effect-${effect.id}`)?.classList.add("loop");
    if (bpm > 0) {
      // handle bpm
      //140 bpm: the beat will play 140 times in a minute
      console.log("SHOULD ONLY BE PRINTED ONCE");
      this.intervalId = globalThis.setInterval(this.play, 60000 / bpm);
      return;
    }
    this.play();
    this.audio.loop = true;
  }

  keyDown() {
    this.keyElement?.classList.add("button-key-clicked");
    if (this.audioRunning) return;

    this.key.effects.forEach((effect) => {
      const { name } = effect;
      switch (name) {
        case "loop":
          effect.isActive ? this.loop(effect) : this.play();

          break;
        case "volume":
          this.audio.volume =
            effect.config.level >= 0 && effect.config.level <= 1
              ? effect.config.level
              : 1;

        default:
          this.play();

          break;
      }
    });

    this.audioRunning = true;
  }
  keyUp() {
    this.keyElement?.classList.remove("button-key-clicked");
    this.audioRunning = false;
  }
}
