import { Game } from "../game";

export class BackgroundUI {
  game: Game;
  woodpanel = new Image();

  get height() {
    return 0.2 * this.game.main.width;
  }
  constructor(game: Game) {
    this.game = game;
    this.woodpanel.src = "assets/ui/woodpanel.jpg";
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = 0.6;
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
