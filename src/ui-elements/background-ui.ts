import { GameObject } from "../classes/game-object";
import { Game } from "../game";

export class BackgroundUI extends GameObject {
  game: Game;
  woodpanel = new Image();

  constructor(game: Game) {
    super(game, 0, 0, 1, 0.2);

    this.game = game;
    this.woodpanel.src = "assets/ui/woodpanel.jpg";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = 1;
    ctx.drawImage(
      this.woodpanel,
      0,
      this.game.main.height - this.height,
      this.game.main.width,
      this.height
    );
    ctx.restore();
  }
}
