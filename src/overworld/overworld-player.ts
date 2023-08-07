import { GameObject } from "../classes/game-object";
import { PlayerData } from "../game";
import { rectRectCollision } from "../utils/utils";
import { Overworld } from "./overworld";
import { OverworldEnemy } from "./overworld-enemy";
import { Tile } from "./tile";

export class OverworldPlayer extends GameObject {
  overworld: Overworld;
  speed = 2;
  speedX = 0;

  speedY = 0;
  image = new Image();
  isPlayer = true;

  constructor(overworld: Overworld, playerData: PlayerData) {
    super(overworld.game);
    this.overworld = overworld;
    this.image.src = playerData.imgSrc;
  }

  update(deltaTime: number) {
    super.update(deltaTime);

    this.checkCollision();
  }

  move(x: number, y: number) {
    this.speedX = x;
    this.speedY = y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.drawX, this.drawY, this.width, this.height);

    ctx.drawImage(this.image, this.drawX, this.drawY, this.width, this.height);
  }

  // Update the player's position based on input
  updatePlayerPosition(keys: any) {
    if (keys.ArrowUp) {
      let newY = this.y - this.speed;
      if (newY <= 0.01) {
        newY = 0.01;
      }
      this.y = newY;
    }
    if (keys.ArrowDown) {
      // todo: clamp to max width/height?
      this.y += this.speed;
    }
    if (keys.ArrowLeft) {
      let newX = this.x - this.speed;
      if (newX <= 0.01) {
        newX = 0.01;
      }
      this.x = newX;
    }
    if (keys.ArrowRight) {
      // todo: clamp to max width/height?
      this.x += this.speed;
    }
  }

  checkCollision() {
    const collisionItems = this.overworld.clickableItems.filter(
      (item: GameObject) =>
        rectRectCollision(item, this) &&
        !((item as any) instanceof OverworldPlayer)
    );

    if (collisionItems.length === 0) {
      this.updatePlayerPosition(this.overworld.inputHandler.keys);
    } else {
      collisionItems.forEach((item: GameObject) => {
        if ((item as any) instanceof OverworldEnemy) {
          console.log("collision");
          this.overworld.overworldEnemies =
            this.overworld.overworldEnemies.filter(
              (enemy: OverworldEnemy) => enemy !== item
            );

          this.overworld.game.startBattle((item as OverworldEnemy).enemies);
        }
      });
    }
  }
}
