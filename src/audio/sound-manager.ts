export class SoundManager {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = document.querySelector("audio#sound") as HTMLAudioElement;
    // this.audio.volume = 0.2;
    this.audio.volume = 0;
  }

  playUiClick() {
    const playPromise = this.audio.play();
    if (playPromise !== null) {
      playPromise.catch(() => {
        this.audio.play();
      });
    }
  }
}
