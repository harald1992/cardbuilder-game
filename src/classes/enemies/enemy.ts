import { $cardDictionary } from "../../dictionaries/card-dictionary";
import { Game } from "../../game";
import { Card } from "../card";
import { Unit } from "../unit";

export class Enemy extends Unit {
  get x() {
    return 0.75 * this.game.main.width;
  }

  get y() {
    return 0.4 * this.game.main.height;
  }

  constructor(game: Game) {
    super(game);
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}
