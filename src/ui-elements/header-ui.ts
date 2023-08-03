import { GameObject } from "../classes/game-object";
import { Game } from "../game";
import { roundedImage } from "../utils/utils";
import { BattleUI } from "./battle-ui";

export class HeaderUI extends GameObject {
  game: Game;

  image = new Image();

  constructor(game: Game) {
    super(game, 0, 0, 1, 0.05);
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
      this.x + 0.5 * this.width,
      this.y + 0.5 * this.height
    );
  }

  drawBackgroundImage(ctx: CanvasRenderingContext2D) {
    ctx.save();
    roundedImage(ctx, this.x, this.y, this.width, this.height, 4);
    ctx.clip();

    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}
