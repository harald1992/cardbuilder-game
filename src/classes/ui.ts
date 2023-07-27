import { Game } from "../game";

export class UI {
  game: Game;
  woodpanel = new Image();
  height = 200;

  constructor(game: Game) {
    this.game = game;
    this.woodpanel.src = "assets/ui/woodpanel.jpg";
  }

  update(deltaTime: number) {

  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.woodpanel,
      0,
      this.game.main.height - this.height,
      this.game.main.width,
      this.height
    );

    // ctx.drawImage();
  }
}
