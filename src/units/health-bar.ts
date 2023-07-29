import { Enemy } from "../units/enemies/enemy";
import { Player } from "../units/player";
import { Unit } from "./unit";

export class HealthBar {
  gameObject: Player | Enemy | Unit;

  get barHeight() {
    return 0.1 * this.gameObject.height;
  }

  get barWidth() {
    return this.gameObject.width;
  }

  constructor(gameObject: Player | Enemy | Unit) {
    this.gameObject = gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.font = `${this.barHeight}px Roboto`;

    this.drawHealthBar(ctx);
    this.drawManaBar(ctx);
  }

  drawHealthBar(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x;
    const y = this.gameObject.y - 2 * this.barHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, this.barWidth, this.barHeight);

    const percentage = this.gameObject.currentHp / this.gameObject.maxHp;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, percentage * this.barWidth, this.barHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, this.barWidth, this.barHeight);

    ctx.fillStyle = "black";
    ctx.font = `${this.barHeight}px Roboto`;
    ctx.fillText(
      "HP: " + this.gameObject.currentHp,
      x + 10,
      y + 0.6 * this.barHeight,
    );
  }

  drawManaBar(ctx: CanvasRenderingContext2D) {
    const x = this.gameObject.x;
    const y = this.gameObject.y - this.barHeight;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, this.barWidth, this.barHeight);

    const percentage = this.gameObject.currentMp / this.gameObject.maxMp;
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, percentage * this.barWidth, this.barHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, this.barWidth, this.barHeight);

    ctx.fillStyle = "black";
    ctx.font = `${this.barHeight}px Roboto`;

    ctx.fillText(
      "MP: " + this.gameObject.currentMp,
      x + 10,
      y + 0.6 * this.barHeight,
    );
  }
}
