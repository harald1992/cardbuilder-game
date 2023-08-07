import { Main } from ".";
import { Game } from "./game";
import { $store } from "./store";

export class MainMenu {
  main: Main;
  mainMenuElement: HTMLElement;
  image: HTMLImageElement;

  constructor(main: Main) {
    this.main = main;
    this.mainMenuElement = document.querySelector("#main-menu") as HTMLElement;
    this.image = document.getElementById("img-main-menu") as HTMLImageElement;
  }

  init() {
    const buttons: NodeListOf<HTMLButtonElement> =
      this.mainMenuElement.querySelectorAll("button");

    buttons.forEach((button: HTMLButtonElement) => {
      button.addEventListener("click", (event: MouseEvent) => {
        this.main.soundManager.playUiClick();

        const id: string | null = button.getAttribute("id");

        switch (id) {
          case "new":
            this.mainMenuElement.style.display = "none";
            this.main.newGame();
            break;
          case "store":
            console.log($store.game);
          default:
            console.log(id);
        }
      });
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, 0, 0, this.main.width, this.main.height);
  }
}
