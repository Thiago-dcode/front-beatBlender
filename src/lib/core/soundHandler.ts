import { LoopEffect, key } from "@/types";

export default class SoundHandler {
  private readonly audio: HTMLAudioElement;
  private audioRunning: boolean = false;
  private keyElement: HTMLElement | null = null;
  constructor(private key: key) {
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
  }
  loop(effect: LoopEffect) {
    if (this.audio.loop) {
      this.pause();
      this.audio.loop = false;
      document
        .getElementById(`loop-effect-${effect.id}`)
        ?.classList.remove("loop");
      return;
    }

    this.play();
    this.audio.loop = true;
    document.getElementById(`loop-effect-${effect.id}`)?.classList.add("loop");
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
          this.audio.volume = effect.config.level;

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
