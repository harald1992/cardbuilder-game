import { CardTitle, getCardByTitles } from "../../dictionaries/card-dictionary";
import { Game } from "../../game";
import { Enemy } from "./enemy";

export class Ghost extends Enemy {
  game: Game;
  constructor(game: Game, xPercentage = 0.75, yPercentage = 0.4) {
    super(game, xPercentage, yPercentage);
    this.game = game;
    this.image.src = "assets/units/monster-ghost.png";
    this.maxHp = 5;
    this.maxMp = 2;

    this.deck.allCards = getCardByTitles(this, [
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
