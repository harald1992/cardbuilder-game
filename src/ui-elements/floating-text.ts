import { GameObject } from "../classes/game-object";

export class FloatingText extends GameObject {
  ob: GameObject;
  text: string;
  // delay = 100;
  // counter = 0;
  // opacity = 1;
  fade = true;

  constructor(ob: GameObject, text: string) {
    super(ob.game);
    this.ob = ob;
    this.text = text;
  }

  // update(deltaTime: number) {
  //   // if (this.opacity < 0.1) {
  //   //   this.markedForDeletion = true;
  //   // }
  //   // if (this.counter >= this.delay) {
  //   //   this.opacity -= 0.1;
  //   //   this.counter = 0;
  //   // } else {
  //   //   this.counter += deltaTime;
  //   // }
  // }

  mainDraw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.font = "32px Roboto";
    ctx.textAlign = "center";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 3;
    ctx.shadowColor = "black";
    ctx.fillStyle = "white";

    ctx.fillText(
      this.text,
      this.ob.x + 0.5 * this.ob.width,
      this.ob.y + 0.5 * this.ob.height
    );

    ctx.restore();
  }
}
