import { GameObject } from "../classes/game-object";
import { rectRectCollision } from "../utils/utils";
import { GameMap } from "./gameMap";
import { Tile } from "./tile";

function isTopOfThis(thisOb: GameObject, tile: GameObject) {
  const ob = {
    x: thisOb.x,
    y: thisOb.y - 5,
    width: 0.1,
    height: 0.1,
  };
  let collision = rectRectCollision(ob, tile);
  return collision;
}

function isRightOfThis(thisOb: GameObject, tile: GameObject) {
  const ob = {
    x: thisOb.x + thisOb.width + 5,
    y: thisOb.y,
    width: 0.1,
    height: 0.1,
  };
  let collision = rectRectCollision(ob, tile);
  return collision;
}

function isBottomOfThis(thisOb: GameObject, tile: GameObject) {
  const ob = {
    x: thisOb.x,
    y: thisOb.y + thisOb.height + 5,
    width: 0.1,
    height: 0.1,
  };
  let collision = rectRectCollision(ob, tile);
  return collision;
}

function isLeftOfThis(thisOb: GameObject, tile: GameObject) {
  const ob = {
    x: thisOb.x - 5,
    y: thisOb.y,
    width: 0.1,
    height: 0.1,
  };
  let collision = rectRectCollision(ob, tile);
  return collision;
}

export class Wall extends GameObject {
  gameMap: GameMap;
  canMove = false;
  constructor(gameMap: GameMap, x = 0, y = 0) {
    super(gameMap.overworld.game, x, y, 0.1, 0.1);
    this.gameMap = gameMap;
  }

  mainDraw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "black";
    ctx.fillRect(this.drawX, this.drawY, this.width, this.height);

    const roomArray = this.gameMap.floorTiles;

    ctx.fillStyle = "#18181a";
    ctx.strokeStyle = "grey";
    if (roomArray.find((tile: GameObject) => isTopOfThis(this, tile))) {
      this.drawTopWall(ctx);
    }
    if (roomArray.find((tile: GameObject) => isRightOfThis(this, tile))) {
      this.drawRightWall(ctx);
    }
    if (roomArray.find((tile: GameObject) => isBottomOfThis(this, tile))) {
      this.drawBottomWall(ctx);
    }
    if (roomArray.find((tile: GameObject) => isLeftOfThis(this, tile))) {
      this.drawLeftWall(ctx);
    }

    // todo: also draw Corners. And simplify this above
  }

  drawRightWall(ctx: CanvasRenderingContext2D): void {
    let x = this.drawX + 0.9 * this.width;
    let w = 0.1 * this.width;
    ctx.fillRect(x, this.drawY, w, this.height);
    // ctx.strokeRect(x, this.drawY, w, this.height);
  }

  drawLeftWall(ctx: CanvasRenderingContext2D): void {
    let x = this.drawX;
    let w = 0.1 * this.width;
    ctx.fillRect(x, this.drawY, w, this.height);
    // ctx.strokeRect(x, this.drawY, w, this.height);
  }

  drawTopWall(ctx: CanvasRenderingContext2D): void {
    // let x = this.drawX + 0.9 * this.width;
    let h = 0.1 * this.height;
    ctx.fillRect(this.drawX, this.drawY, this.width, h);
    // ctx.strokeRect(this.drawX, this.drawY, this.width, h);
  }

  drawBottomWall(ctx: CanvasRenderingContext2D): void {
    let y = this.drawY + 0.9 * this.height;
    let h = 0.1 * this.height;
    ctx.fillRect(this.drawX, y, this.width, h);
    // ctx.strokeRect(this.drawX, y, this.width, h);
  }
}
