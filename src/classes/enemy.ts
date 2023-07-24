import { Game } from "../game";
import { Unit } from "./unit";

export class Enemy extends Unit {
  constructor(game: Game) {
    const x = 0.8 * game.main.width;
    const y = 0.5 * game.main.height;
    const imgSrc = "assets/units/monster-ghost.png";

    super(game, x, y, imgSrc);
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    // ctx.drawImage(this.image, this.x, this.y, 100, 100);
    // this.healthBar.draw(ctx);
  }
}
