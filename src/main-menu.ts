import { GameState } from ".";
import { Game } from "./game";
import { $store } from "./store";

export class MainMenu {
  game: Game;
  mainMenuElement: HTMLElement;

  constructor(game: Game) {
    this.game = game;
    this.mainMenuElement = document.querySelector(".main-menu") as HTMLElement;
  }

  init() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (this.mainMenuElement.style.display === "none") {
          this.game.main.changeGameState(GameState.INGAMEPAUSE);
        } else {
          this.game.main.changeGameState(GameState.INGAME);
        }
      }
    });

    const buttons: NodeListOf<HTMLButtonElement> =
      this.mainMenuElement.querySelectorAll("button");

    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", (event: MouseEvent) => {
        this.playSound();

        const id: string | null = button.getAttribute("id");

        switch (id) {
          case "continue":
            this.game.main.changeGameState(GameState.INGAME);
            break;
          case "new":
            this.game.main.changeGameState(GameState.INGAME);
            this.game.newGame();
            break;
          case "store":
            console.log($store.getGame());
          default:
            console.log(id);
        }
      });
    });
  }

  playSound() {
    const audio = document.querySelector("audio#sound") as HTMLAudioElement;
    audio.src =
      "assets/Neverwinter Nights Definitive Edition Assets/mus/mus_autorun2.wav";
    audio.volume = 0.2;
    audio.play();
  }
}
