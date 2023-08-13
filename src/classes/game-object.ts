import { Game } from "../game";

export class GameObject {
  widthPercentage = 0.1;
  heightPercentage = 0.1;
  game: Game;
  x = 0;
  y = 0;
  markedForDeletion = false;

  opacityDelay = 100;
  opacityCounter = 0;
  opacity = 1;
  fade = false;

  get drawX() {
    return this.x - this.game.camera.x;
  }

  get drawY() {
    return this.y - this.game.camera.y;
  }

  get width() {
    return this.widthPercentage * this.game.main.width || 0;
  }

  get height() {
    return this.heightPercentage * this.game.main.width || 0;
  }

  constructor(
    game: Game,
    x = 0,
    y = 0,
    widthPercentage = 0.1,
    heightPercentage = 0.1
  ) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.widthPercentage = widthPercentage;
    this.heightPercentage = heightPercentage;
  }

  update(deltaTime: number) {
    if (this.fade) {
      this.setFadeOpacity(deltaTime);
    }
  }

  setFadeOpacity(deltaTime: number) {
    if (this.opacity < 0.1) {
      this.markedForDeletion = true;
    }
    if (this.opacityCounter >= this.opacityDelay) {
      this.opacity -= 0.1;
      this.opacityCounter = 0;
    } else {
      this.opacityCounter += deltaTime;
    }
  }

  beforeDraw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = this.opacity;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {}

  draw(ctx: CanvasRenderingContext2D) {
    this.beforeDraw(ctx);
    this.mainDraw(ctx);
    this.afterDraw(ctx);
  }

  afterDraw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 1;

    if (this.game.main.debugMode) {
      ctx.strokeStyle = "black";
      ctx.strokeRect(this.drawX, this.drawY, this.width, this.height);
    }
  }

  updatePositions() {
    const xPercentage = this.x / this.game.main.oldWidth;
    this.x = xPercentage * this.game.main.width;

    const yPercentage = this.y / this.game.main.oldHeight;
    this.y = yPercentage * this.game.main.height;
  }
}
