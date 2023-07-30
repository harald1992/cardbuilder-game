import { CardTitle, getCardByTitles } from "../../dictionaries/card-dictionary";
import { Game } from "../../game";
import { Enemy } from "./enemy";

// import image from "assets/"
export class Ghost extends Enemy {
  game: Game;
  constructor(game: Game, xPercentage: number, yPercentage: number) {
    super(game, xPercentage, yPercentage);
    this.game = game;
    // this.image.src = "assets/units/monster-ghost.png";
    this.image.src = "assets/units/NwnPortraits/po_shfiend_h.png";
    this.maxHp = 5;
    this.maxMp = 2;

    this.deck.allCards = getCardByTitles(this.deck, [
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.JUNK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
    ]);
  }
}
