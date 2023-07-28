import {
  $cardDictionary,
  CardConfig,
  CardTitle,
  getCardByTitles,
} from "../../dictionaries/card-dictionary";
import { Game } from "../../game";
import { Card } from "../card";
import { Enemy } from "./enemy";

export class Ghost extends Enemy {
  game: Game;
  constructor(game: Game) {
    super(game);
    this.game = game;
    this.image.src = "assets/units/monster-ghost.png";
    this.maxHp = 5;
    this.maxMp = 3;

    this.deck.allCards = getCardByTitles(this, [
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
      CardTitle.LIGHTNING_SPARK,
    ]);
  }
}
