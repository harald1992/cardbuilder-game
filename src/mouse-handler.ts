import { Game } from "./game";
import { mouseRectCollision, rectRectCollision } from "./utils/utils";
import { Mouse } from "./mouse";
import { Card } from "./battle/deck/card";
import { GameObject } from "./classes/game-object";

export class MouseHandler extends GameObject {
  game: Game;
  mouse: Mouse;

  get drawX() {
    return this.x;
  }

  get drawY() {
    return this.y;
  }

  get cursor() {
    return this.game.main.canvas.style.cursor;
  }
  set cursor(value: string) {
    this.game.main.canvas.style.cursor = value;
  }

  constructor(game: Game) {
    super(game);
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
      let collision = [...this.game.clickableItems].find((item: any) => {
        return mouseRectCollision(this.mouse, item) && !item.isUnPlayable;
      });

      // let uiCollision = [this.game.uiItems].find((item: any) => {
      //   return mouseRectCollision(this.mouse, item);
      // });

      if (collision) {
        this.cursor = "pointer";
      } else {
        this.cursor = "default";
      }
    });

    this.game.main.canvas.addEventListener(
      "contextmenu",
      (event: MouseEvent) => {
        event.preventDefault();
        const items = [
          ...this.game.clickableItems,
          ...(this.game.overworld?.gameMap.terrainArray || []),
        ].find((item: any) => mouseRectCollision(this.mouse, item));
        // let uiCollision = [this.game.uiItems].find((item: any) => {
        //   return mouseRectCollision(this.mouse, item);
        // });
        console.log(items);
      }
    );
  }
}
