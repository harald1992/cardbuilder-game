import { GameObject } from "../classes/game-object";
import { PlayerData } from "../game";
import { rectRectCollision } from "../utils/utils";
import { Overworld } from "./overworld";
import { OverworldEnemy } from "./overworld-enemy";
import { Sprite } from "./sprits";
import { Tile } from "./tile";
import { Wall } from "./wall";

export class OverworldPlayer extends GameObject {
  overworld: Overworld;
  speed = 2;
  speedX = 0;

  speedY = 0;
  portrait = new Image();
  isPlayer = true;

  sprite: Sprite;

  constructor(overworld: Overworld, playerData: PlayerData) {
    super(overworld.game);
    this.overworld = overworld;
    this.portrait.src = playerData.imgSrc;

    this.sprite = new Sprite(this, playerData.spriteConfig);
    this.widthPercentage = 0.07;
    this.heightPercentage = 0.07;
  }

  update(deltaTime: number) {
    super.update(deltaTime);

    this.updatePlayerPosition(this.overworld.inputHandler.keys);
  }

  move(x: number, y: number) {
    this.speedX = x;
    this.speedY = y;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(this.drawX, this.drawY, this.width, this.height);
    this.sprite.draw(ctx);
  }

  // Update the player's position based on input
  updatePlayerPosition(keys: any) {
    let newPositions = {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };

    if (keys.ArrowUp) {
      let newY = this.y - this.speed;
      if (newY <= 0.01) {
        newY = 0.01;
      }
      newPositions.y = newY;
    }
    if (keys.ArrowDown) {
      let newY = this.y + this.speed;
      if (newY >= this.overworld.gameMap.mapYMax) {
        newY = this.overworld.gameMap.mapYMax;
      }
      newPositions.y = newY;
    }
    if (keys.ArrowLeft) {
      let newX = this.x - this.speed;
      if (newX <= 0.01) {
        newX = 0.01;
      }
      newPositions.x = newX;
    }
    if (keys.ArrowRight) {
      let newX = this.x + this.speed;
      if (newX >= this.overworld.gameMap.mapXMax) {
        newX = this.overworld.gameMap.mapXMax;
      }
      newPositions.x = newX;
    }

    this.checkCollision(newPositions);
  }

  checkCollision(newPositions: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) {
    let allowedToMove = true;

    let collisionTiles = this.overworld.gameMap.terrainArray.filter(
      (item: GameObject) => rectRectCollision(item, newPositions)
    );

    if (collisionTiles.some((item: Tile | Wall) => !item.canMove)) {
      allowedToMove = false;
    }

    const collisionObjects = this.overworld.clickableItems.filter(
      (item: GameObject) =>
        rectRectCollision(item, newPositions) &&
        !((item as any) instanceof OverworldPlayer)
    );

    if (collisionObjects.length !== 0) {
      allowedToMove = false;
      collisionObjects.forEach((item: GameObject) => {
        if ((item as any) instanceof OverworldEnemy) {
          this.overworld.overworldEnemies = [
            ...this.overworld.overworldEnemies,
          ].filter((enemy: OverworldEnemy) => enemy !== item);

          this.overworld.game.startBattle((item as OverworldEnemy).enemies);
        }
      });
    }

    if (
      allowedToMove &&
      (this.x !== newPositions.x || this.y !== newPositions.y)
    ) {
      this.sprite.setAnimation("walkRight");

      this.x = newPositions.x;
      this.y = newPositions.y;
    } else {
      this.sprite.setAnimation("idleRight");
    }
  }
}
