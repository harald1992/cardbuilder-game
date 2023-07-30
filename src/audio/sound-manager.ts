export class SoundManager {
  audio: HTMLAudioElement;

  constructor() {
    this.audio = document.querySelector("audio#sound") as HTMLAudioElement;
    this.audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_aribeth.bmu";
    this.audio.volume = 0.2;
  }

  playUiClick() {
    const audio = document.querySelector("audio#sound") as HTMLAudioElement;
    audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_autorun2.wav";
    audio.volume = 0.2;
    audio.play();
  }
}
