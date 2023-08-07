import { GameObject } from "../classes/game-object";
import {
  $enemyDictionary,
  EnemyConfig,
  EnemyName,
} from "../dictionaries/enemy-dictionary";
import { Enemy } from "../units/enemy";
import { Overworld } from "./overworld";

export class OverworldEnemy extends GameObject {
  overworld: Overworld;

  enemies: EnemyConfig[] = [];

  constructor(overworld: Overworld) {
    super(overworld.game);
    this.overworld = overworld;

    const randomOneToFour = Math.floor(Math.random() * 3 + 1);
    for (let i = 0; i < randomOneToFour; i++) {
      const randomEnemyIndex = Math.floor(
        Math.random() * $enemyDictionary.length
      );
      const enemy = $enemyDictionary[randomEnemyIndex];
      this.enemies.push(enemy);
    }
  }

  mainDraw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.fillRect(this.drawX, this.drawY, this.width, this.height);
  }
}
