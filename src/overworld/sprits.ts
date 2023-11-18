import { SpriteConfig } from "../models/models";
import { OverworldPlayer } from "./overworld-player";

export class Sprite {
  gameObject: OverworldPlayer;
  image = new Image();

  spriteConfig: SpriteConfig;

  currentAnimation: number[][] = [[0, 0]]; // x and y;
  currentAnimationType: "idle" | "walk" = "idle";
  currentAnimationOrientation: "Right" | "Left" = "Right";
  currentAnimationFrame = 0;

  animationFrameLimit = 16;
  animationFrameProgress = 0;

  constructor(gameObject: OverworldPlayer, spriteConfig: any) {
    this.gameObject = gameObject;

    this.spriteConfig = spriteConfig;

    this.image.src = this.spriteConfig.src;
    this.currentAnimation = this.spriteConfig.animations.idleRight;
  }

  get frame() {
    const frame = this.currentAnimation[this.currentAnimationFrame];
    return frame;
  }

  updateAnimationProgress() {
    this.animationFrameProgress += 1;

    if (this.animationFrameProgress > this.animationFrameLimit) {
      this.currentAnimationFrame += 1;
      this.animationFrameProgress = 0;
    }
    if (!this.frame) {
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = 0;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const [frameX, frameY] = this.frame;

    ctx.drawImage(
      this.image,
      frameX * this.spriteConfig.cutConfig.cutSizeX,
      frameY * this.spriteConfig.cutConfig.cutSizeY,
      this.spriteConfig.cutConfig.cutSizeX,
      this.spriteConfig.cutConfig.cutSizeY,
      this.gameObject.drawX,
      this.gameObject.drawY,
      this.gameObject.width,
      this.gameObject.height
    );

    this.updateAnimationProgress();
  }

  setAnimation(animationType: "idle" | "walk") {
    if (this.currentAnimationType === animationType) {
      return;
    }
    let currentAnimation = (this.spriteConfig.animations as any)[
      animationType + this.currentAnimationOrientation
    ];

    if (currentAnimation) {
      this.currentAnimation = currentAnimation;
      this.currentAnimationType = animationType;
      this.currentAnimationFrame = 0;
    }
  }

  setOrientation(orientation: "Right" | "Left") {
    this.currentAnimationOrientation = orientation;

    this.currentAnimation = (this.spriteConfig.animations as any)[
      this.currentAnimationType + this.currentAnimationOrientation
    ];
  }
}
