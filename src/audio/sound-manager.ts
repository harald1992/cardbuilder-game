export class SoundManager {
  uiClickAudio: HTMLAudioElement;

  constructor() {
    this.uiClickAudio = document.querySelector(
      "audio#sound"
    ) as HTMLAudioElement;
    this.uiClickAudio.volume = 0.1;
  }

  playUiClick() {
    const playPromise = this.uiClickAudio.play();
    if (playPromise !== null) {
      playPromise.catch(() => {
        this.uiClickAudio.play();
      });
    }
  }
}
