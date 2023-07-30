import { CardTitle, getCardByTitles } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Unit } from "./unit";

export class Player extends Unit {
  constructor(game: Game, xPercentage: number, yPercentage: number) {
    super(game, xPercentage, yPercentage);
    // this.image.src = "assets/units/player-wizard.png";
    this.image.src = "assets/units/NwnPortraits/po_hoodshade_L.png";

    // this.isPlayer = true;
    this.team = "player";
    this.maxHp = 20;
    this.maxMp = 3;
    this.deck.allCards = getCardByTitles(this.deck, [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIBRARY,
      CardTitle.HEALING_AID,
      CardTitle.LEGENDARY_STRIKE,
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
