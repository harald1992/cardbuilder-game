import { Enemy } from "./enemy";
import { Player } from "./player";
import { Unit } from "./unit";

export class HealthBar {
  gameObject: Player | Enemy | Unit;
  barHeight = 12;

  constructor(gameObject: Player | Enemy | Unit) {
    this.gameObject = gameObject;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawHealthBar(ctx);
    this.drawManaBar(ctx);
  }

  drawHealthBar(ctx: CanvasRenderingContext2D) {
    const ySize = 50;
    const x = this.gameObject.x + 25;
    const y = this.gameObject.y - 20;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, ySize, this.barHeight);

    const percentage = this.gameObject.currentHp / this.gameObject.maxHp;
    ctx.fillStyle = "red";
    ctx.fillRect(x, y, percentage * ySize, this.barHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, ySize, this.barHeight);

    ctx.fillStyle = "black";
    ctx.font = `${this.barHeight}px`;
    ctx.fillText(
      "HP: " + this.gameObject.currentHp,
      x + 10,
      y + 0.75 * this.barHeight
    );
  }

  drawManaBar(ctx: CanvasRenderingContext2D) {
    const ySize = 50;
    const x = this.gameObject.x + 25;
    const y = this.gameObject.y - 10;

    ctx.fillStyle = "white";
    ctx.fillRect(x, y, ySize, this.barHeight);

    const percentage = this.gameObject.currentMp / this.gameObject.maxMp;
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, percentage * ySize, this.barHeight);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, ySize, this.barHeight);

    ctx.fillStyle = "black";
    ctx.font = `${this.barHeight}px`;

    ctx.fillText(
      "MP: " + this.gameObject.currentMp,
      x + 10,
      y + 0.75 * this.barHeight
    );
  }
}
