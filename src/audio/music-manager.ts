export class MusicManager {
  mainMenuAudio: HTMLAudioElement = new Audio();
  overworldAudio: HTMLAudioElement = new Audio();
  battleAudio: HTMLAudioElement = new Audio();

  get allAudio() {
    return [this.mainMenuAudio, this.overworldAudio, this.battleAudio];
  }

  constructor() {
    this.mainMenuAudio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_autorun.wav";

    this.overworldAudio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_x2fireplane.bmu";

    this.battleAudio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_x2hell.bmu";

    this.initAllAudio();
  }

  initAllAudio() {
    this.allAudio.forEach((audio: HTMLAudioElement) => {
      audio.volume = 0;
      audio.addEventListener("ended", (e) => {
        console.log(e);
        audio.play();
      });
    });
  }

  stopAllAudio() {
    this.allAudio.forEach((audio: HTMLAudioElement) => audio.pause());
  }

  playBattleMusic() {
    this.stopAllAudio();
    // prevent sound race condition resulting in error
    const playPromise = this.battleAudio.play();

    if (playPromise !== null) {
      playPromise.catch(() => {
        this.battleAudio.volume = 0.2;
        this.battleAudio.play();
      });
    }
  }

  playOverworldMusic() {
    this.stopAllAudio();

    // prevent sound race condition resulting in error
    const playPromise = this.overworldAudio.play();

    if (playPromise !== null) {
      playPromise.catch(() => {
        this.overworldAudio.volume = 0.2;
        this.overworldAudio.play();
      });
    }
  }

  // stopMusic() {
  //   this.overworldAudio.pause();
  // }
}
