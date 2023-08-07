import { BattleManager } from "../battle/battle-manager";
import { GameObject } from "../classes/game-object";
import { roundedImage } from "../utils/utils";
// import { BattleUI } from "./battle-ui";

export class EndTurnButton extends GameObject {
  battleManager: BattleManager;

  image = new Image();

  constructor(battleManager: BattleManager) {
    super(
      battleManager.game,
      0.8 * battleManager.game.main.width,
      0.5 * battleManager.game.main.height,
      0.1,
      0.05
    );
    this.battleManager = battleManager;
    this.image.src = "assets/cards/background_red.png";
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    this.drawBackgroundImage(ctx);

    ctx.fillStyle = "white";
    ctx.font = `24px Roboto`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
      "End Turn",
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
