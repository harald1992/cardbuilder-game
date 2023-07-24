import { Game } from "../game";
import { HealthBar } from "./health-bar";

export class Unit {
  x = 500;
  y = 200;
  width = 100;
  height = 100;

  maxHp: number = 5;
  currentHp = this.maxHp;
  maxMp = 10;
  currentMp = this.maxMp;
  image = new Image();
  game: Game;
  healthBar: HealthBar;

  constructor(
    game: Game,
    x: number,
    y: number,
    imgSrc: string = "assets/units/monster-ghost.png"
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.healthBar = new HealthBar(this);
    this.image.src = imgSrc;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    this.healthBar.draw(ctx);

    if (this.game.main.debugMode) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, 100, 100);
    }
  }
}
