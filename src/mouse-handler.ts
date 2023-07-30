import { Game } from "./game";
import { rectRectCollision } from "./utils/utils";
import { Mouse } from "./mouse";

export class MouseHandler {
  game: Game;
  mouse: Mouse;

  get cursor() {
    return this.game.main.canvas.style.cursor;
  }
  set cursor(value: string) {
    this.game.main.canvas.style.cursor = value;
  }

  constructor(game: Game) {
    this.game = game;
    this.mouse = game.mouse;

    this.mouseHoverEffects();
  }

  mouseHoverEffects() {
    this.game.main.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      if (
        this.game.clickableItems.some((item: any) =>
          rectRectCollision(item, this.mouse)
        )
      ) {
        this.cursor = "pointer";
      } else {
        this.cursor = "default";
      }
    });

    this.game.main.canvas.addEventListener("click", (event: MouseEvent) => {
      const item = this.game.clickableItems.find((item: any) =>
        rectRectCollision(item, this.mouse)
      );
      console.log(item);
    });
  }
}
