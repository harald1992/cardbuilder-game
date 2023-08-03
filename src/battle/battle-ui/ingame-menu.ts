import { GameState } from "../..";
import { Game } from "../../game";
import { $store } from "../../store";
import { BattleManager } from "../battle-manager";

export class IngameMenu {
  game: Game;
  ingameMenuElement: HTMLElement;
  image: HTMLImageElement;
  backdropElement: HTMLElement;

  constructor(game: Game) {
    this.game = game;
    this.ingameMenuElement = document.querySelector(
      "#ingame-menu"
    ) as HTMLElement;
    this.image = document.getElementById("img-main-menu") as HTMLImageElement;

    this.backdropElement = document.querySelector(".backdrop") as HTMLElement;
  }

  init() {
    this.addButtonListeners();
    this.showHideMenuOnEscape();
  }

  addButtonListeners() {
    const buttons: NodeListOf<HTMLButtonElement> =
      this.ingameMenuElement.querySelectorAll("button");

    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", (event: MouseEvent) => {
        this.game.main.soundManager.playUiClick();

        const id: string | null = button.getAttribute("id");

        switch (id) {
          case "continue":
            this.toggleMenu();
            break;
          case "nav-main-menu":
            this.toggleMenu();
            this.game.main.changeGameState(GameState.MAINMENU);
            break;
          case "store":
            console.log($store.game);
          default:
            console.log(id);
        }
      });
    });
  }

  showHideMenuOnEscape() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (
        event.key === "Escape" &&
        this.game.main.gameState !== GameState.MAINMENU
      ) {
        this.toggleMenu();
      }
    });
  }

  toggleMenu() {
    if (this.ingameMenuElement.style.display === "none") {
      this.ingameMenuElement.style.display = "flex";
      this.backdropElement.style.display = "block";
    } else {
      this.ingameMenuElement.style.display = "none";
      this.backdropElement.style.display = "none";
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      0,
      0,
      this.game.main.width,
      this.game.main.height
    );
  }
}

// import { GameState } from "../..";
// import { BattleManager } from "../battle-manager";

// export class IngameMenu {
//   battleManager: BattleManager;

//   constructor(battleManager: BattleManager) {
//     this.battleManager = battleManager;
//   }

// }
