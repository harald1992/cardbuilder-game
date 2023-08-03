export class MusicManager {
  audio: HTMLAudioElement;
  constructor() {
    this.audio = document.querySelector("audio#music") as HTMLAudioElement;
    this.audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_aribeth.bmu";
    this.audio.volume = 0.2;
  }

  playBattleMusic() {
    // audio.volume = 0;
    this.audio.pause();

    this.audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_bat_aribeth.bmu";
    this.audio.play();
  }

  playOverworldMusic() {
    this.audio.pause();
    this.audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_dag_forest.bmu";
    // audio.volume = 0;
    this.audio.play();
  }

  stopMusic() {
    this.audio.pause();
  }
}
