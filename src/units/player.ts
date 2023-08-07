import { CardTitle, getCardByTitles } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Unit } from "./unit";

export class Player extends Unit {
  constructor(game: Game, xPercentage: number, yPercentage: number) {
    super(game, xPercentage, yPercentage);
    // this.image.src = "assets/units/player-wizard.png";
    this.image.src = game.playerData.imgSrc;

    // this.isPlayer = true;
    this.team = "player";
    this.maxHp = game.playerData.maxHp;
    this.maxMp = game.playerData.maxMp;
    this.deck.allCards = getCardByTitles(this.deck, game.playerData.allCards);
    // this.deck.allCards = getCardByTitles(this.deck, [
    //   CardTitle.JUNK,
    //   CardTitle.JUNK,
    //   CardTitle.JUNK,
    //   CardTitle.JUNK,
    //   CardTitle.BITE,
    //   CardTitle.LIGHTNING_SPARK,
    //   CardTitle.LIBRARY,
    //   CardTitle.HEALING_AID,
    //   CardTitle.STRIKE,
    //   CardTitle.LIGHTNING_BOLT,
    // ]);
  }

  // update(deltaTime: number) {
  //   super.update(deltaTime);
  // }

  // draw(ctx: CanvasRenderingContext2D) {
  //   super.draw(ctx);
  // }
}
