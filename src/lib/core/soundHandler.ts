export default class SoundHandler {
  private readonly audio: HTMLAudioElement;
  private audioRunning: boolean = false;
  private looping = true;
  constructor(audioUrl: string) {
    this.audio = new Audio(audioUrl);
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.keyDown = this.keyDown.bind(this);
    this.keyUp = this.keyUp.bind(this);
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
  }

  keyDown(effect: string = "") {
    if (this.audioRunning) return;
    switch (effect) {
      case "loop":
        this.audio.addEventListener("ended", () => {
          this.looping ? this.pause() : this.play();
        });

        this.looping = !this.looping;
        if (!this.looping) this.play();
        break;
      default:
        this.play();

        break;
    }
    this.audioRunning = true;
  }
  keyUp() {
    this.audioRunning = false;
  }
}
