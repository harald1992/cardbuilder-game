import { Game } from "./game";

export class Mouse {
  game: Game;
  x: number | undefined = 0;
  y: number | undefined = 0;
  width = 0.1;
  height = 0.1;
  canvas: HTMLCanvasElement;
  canvasPosition: DOMRect;

  get xPercentage() {
    if (!this.x) {
      return 0;
    }
    return this.x / this.game.main.width;
  }

  get yPercentage() {
    if (!this.y) {
      return 0;
    }
    return this.y / this.game.main.width;
  }

  constructor(game: Game) {
    this.game = game;
    this.canvas = this.game.main.canvas;

    this.canvasPosition = this.canvas.getBoundingClientRect();
    this.init();
  }

  init() {
    this.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      this.x = event.x - this.canvasPosition.left;
      this.y = event.y - this.canvasPosition.top;
    });

    this.canvas.addEventListener("mouseleave", (event: MouseEvent) => {
      this.x = undefined;
      this.y = undefined;
    });
  }
}
