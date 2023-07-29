import { Game } from "../../game";
import { Unit } from "../unit";

export class Enemy extends Unit {
  xPercentage = 0;
  yPercentage = 0;

  get x() {
    // return 0.75 * this.game.main.width;
    return this.xPercentage * this.game.main.width;
  }

  get y() {
    // return 0.4 * this.game.main.height;
    return this.yPercentage * this.game.main.width;
  }

  constructor(game: Game, xPercentage = 0.75, yPercentage = 0.4) {
    super(game);
    this.xPercentage = xPercentage;
    this.yPercentage = yPercentage;
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}
