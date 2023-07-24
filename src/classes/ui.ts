import { Game } from "../game";

export class UI {
  game: Game;
  woodpanel = new Image();

  constructor(game: Game) {
    this.game = game;
    this.woodpanel.src = "assets/ui/woodpanel.jpg";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.woodpanel,
      0,
      this.game.main.height - 200,
      this.game.main.width,
      200
    );

    // ctx.drawImage();
  }
}
