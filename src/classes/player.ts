import { CardTitle, getCardByTitles } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Unit } from "./unit";

export class Player extends Unit {
  get x() {
    return 0.05 * this.game.main.width;
  }

  get y() {
    return 0.4 * this.game.main.height;
  }

  constructor(game: Game) {
    super(game);
    this.image.src = "assets/units/player-wizard.png";
    this.isPlayer = true;
    this.maxHp = 5;
    this.maxMp = 3;
    this.deck.allCards = getCardByTitles(this, [
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_BOLT,
      CardTitle.LIGHTNING_BOLT,
      CardTitle.LIGHTNING_BOLT,
      CardTitle.LIGHTNING_BOLT,
      CardTitle.LIGHTNING_BOLT,
    ]);
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}
