import { roundedImage } from "../utils/utils";
import { UI } from "./ui";

export class EndTurnButton {
  ui: UI;

  image = new Image();

  get width() {
    return 0.1 * this.ui.game.main.width;
  }

  get height() {
    return 0.05 * this.ui.game.main.width;
  }

  get x() {
    return 0.8 * this.ui.game.main.width;
  }

  get y() {
    return 0.8 * this.ui.game.main.height;
  }
  constructor(ui: UI) {
    this.ui = ui;
    this.image.src = "assets/cards/background_red.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawBackgroundImage(ctx);

    ctx.fillStyle = "white";
    ctx.font = `24px Roboto`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      "End Turn",
      this.x + 0.5 * this.width,
      this.y + 0.5 * this.height,
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
