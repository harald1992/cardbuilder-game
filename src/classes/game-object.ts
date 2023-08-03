import { Game } from "../game";

export class GameObject {
  widthPercentage = 0.1;
  heightPercentage = 0.1;
  game: Game;
  x = 0;
  y = 0;
  markedForDeletion = false;

  get xPercentage() {
    return this.x / this.game.main.width || 0;
  }

  set xPercentage(value: number) {
    this.x = value * this.game.main.width || 0;
  }

  get yPercentage() {
    return this.y / this.game.main.height || 0;
  }

  set yPercentage(value: number) {
    this.y = value * this.game.main.height || 0;
  }

  get width() {
    return this.widthPercentage * this.game.main.width || 0;
  }

  get height() {
    return this.heightPercentage * this.game.main.width || 0;
  }

  constructor(
    game: Game,
    xPercentage = 0,
    yPercentage = 0,
    widthPercentage = 0.1,
    heightPercentage = 0.1
  ) {
    this.game = game;
    this.xPercentage = xPercentage;
    this.yPercentage = yPercentage;
    this.widthPercentage = widthPercentage;
    this.heightPercentage = heightPercentage;
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    if (this.game.main.debugMode) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }

  updatePositions() {
    const xPercentage = this.x / this.game.main.oldWidth;
    this.xPercentage = xPercentage;

    const yPercentage = this.y / this.game.main.oldHeight;
    this.yPercentage = yPercentage;
  }
}
