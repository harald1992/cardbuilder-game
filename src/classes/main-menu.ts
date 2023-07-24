import { Game } from "../game";

export class MainMenu {
  game: Game;
  mainMenu: HTMLElement;

  constructor(game: Game) {
    this.game = game;
    this.mainMenu = document.querySelector(".main-menu") as HTMLElement;
  }

  init() {
    this.showMenu();

    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (this.mainMenu.style.display === "none") {
          this.showMenu();
        } else {
          this.hideMenu();
        }
      }
    });

    const buttons: NodeListOf<HTMLButtonElement> =
      this.mainMenu.querySelectorAll("button");

    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", (event: MouseEvent) => {
        const id: string | null = button.getAttribute("id");

        switch (id) {
          case "new":
            this.hideMenu();
            this.game.newGame();
            break;
          default:
            console.log(id);
        }
      });
    });
  }

  showMenu() {
    this.mainMenu.style.display = "flex";
    this.game.pause = true;
  }

  hideMenu() {
    this.mainMenu.style.display = "none";
  }
}
