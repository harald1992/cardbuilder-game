import { CardTitle, getCardByTitles } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Unit } from "./unit";

export class Player extends Unit {
  constructor(game: Game, xPercentage: number, yPercentage: number) {
    super(game, xPercentage, yPercentage);
    this.image.src = game.playerData.imgSrc;

    this.team = "player";
    this.maxHp = game.playerData.maxHp;
    this.maxMp = game.playerData.maxMp;
    this.deck.allCards = getCardByTitles(this.deck, game.playerData.allCards);
  }
}
