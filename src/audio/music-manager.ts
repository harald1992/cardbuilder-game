export class MusicManager {
  audio: HTMLAudioElement;
  constructor() {
    this.audio = document.querySelector("audio#music") as HTMLAudioElement;
    this.audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_aribeth.bmu";
    // this.audio.volume = 0.2;
    this.audio.volume = 0;
  }

  playBattleMusic() {
    // prevent sound race condition resulting in error
    const playPromise = this.audio.play();
    if (playPromise !== null) {
      playPromise.catch(() => {
        this.audio.src =
          "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_aribeth.bmu";
        // audio.volume = 0;
        this.audio.play();
      });
    }
  }

  playOverworldMusic() {
    const playPromise = this.audio.play();
    if (playPromise !== null) {
      playPromise.catch(() => {
        this.audio.src =
          "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_ruralnite.bmu";
        // audio.volume = 0;
        this.audio.play();
      });
    }
  }

  stopMusic() {
    this.audio.pause();
  }
}
