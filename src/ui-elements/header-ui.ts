import { GameObject } from "../classes/game-object";
import { Game } from "../game";
import { roundedImage } from "../utils/utils";
// import { BattleUI } from "./battle-ui";

export class HeaderUI {
  game: Game;
  image = new Image();

  get x() {
    return this.game.camera.x;
  }

  get y() {
    return this.game.camera.y;
  }

  get drawX() {
    // so mouse collisions always work
    return 0;
  }

  get drawY() {
    // return this.game.camera.y;
    return 0;
  }

  get width() {
    return 1 * this.game.main.width;
  }

  get height() {
    return 0.05 * this.game.main.height;
  }

  constructor(game: Game) {
    // super(game, 0, 0, 1, 0.05);
    this.game = game;
    this.image.src = "assets/ui/woodpanel.jpg";
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawBackgroundImage(ctx);

    ctx.fillStyle = "white";
    ctx.font = `24px Roboto`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      `Gold: ${this.game.playerGold}`,
      this.drawX + 0.5 * this.width,
      this.drawY + 0.5 * this.height
    );
  }

  drawBackgroundImage(ctx: CanvasRenderingContext2D) {
    ctx.save();
    roundedImage(ctx, this.drawX, this.drawY, this.width, this.height, 4);
    ctx.clip();

    ctx.drawImage(this.image, this.drawX, this.drawY, this.width, this.height);
    ctx.restore();
  }
}
