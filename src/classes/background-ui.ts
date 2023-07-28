import { Game } from "../game";

export class BackgroundUI {
  game: Game;
  woodpanel = new Image();
  height = 200;

  constructor(game: Game) {
    this.game = game;
    this.woodpanel.src = "assets/ui/woodpanel.jpg";

    this.height = 0.2 * this.game.main.width;
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    // ctx.drawImage(
    //   this.woodpanel,
    //   0,
    //   this.game.main.height - this.height,
    //   this.game.main.width,
    //   this.height
    // );
    // ctx.drawImage();
  }
}
