import { Game } from "./game";
import { rectRectCollision } from "./utils/utils";
import { Mouse } from "./mouse";
import { Card } from "./battle/deck/card";

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
  }

  init() {
    this.mouseHoverEffects();
    this.mouseClickSoundEffect();
  }

  mouseClickSoundEffect() {
    this.game.main.canvas.addEventListener("click", (event: Event) => {
      this.game.main.soundManager.playUiClick();
    });
  }

  mouseHoverEffects() {
    this.game.main.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      const collision = this.game.clickableItems.find((item: any) => {
        return rectRectCollision(item, this.mouse) && !item.isUnPlayable;
      });

      if (collision) {
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
