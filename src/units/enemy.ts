import { getCardByTitles } from "../dictionaries/card-dictionary";
import {
  $enemyDictionary,
  EnemyConfig,
  EnemyName,
} from "../dictionaries/enemy-dictionary";
import { Game } from "../game";
import { Unit } from "./unit";

export class Enemy extends Unit {
  name = "Template";

  constructor(
    game: Game,
    enemyName: EnemyName,
    xPercentage: number,
    yPercentage: number
  ) {
    super(game, xPercentage, yPercentage);
    let config: EnemyConfig =
      $enemyDictionary.find(
        (enemyConfig: EnemyConfig) => enemyConfig.name === enemyName
      ) || $enemyDictionary[0];

    this.name = config.name;
    this.image.src = config.imgSrc;

    this.maxHp = config.maxHp;
    this.maxMp = config.maxMp;

    this.deck.allCards = getCardByTitles(this.deck, config.allCards);
  }

  update(deltaTime: number) {
    super.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
  }
}
