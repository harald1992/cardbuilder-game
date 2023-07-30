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
    const buttons: NodeListOf<HTMLButtonElement> =
      this.mainMenuElement.querySelectorAll("button");

    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", (event: MouseEvent) => {
        this.game.main.soundManager.playUiClick();

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
}
