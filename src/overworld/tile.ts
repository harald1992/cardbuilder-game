import { GameMap } from "./gameMap";

export class Tile {
  gameMap: GameMap;

  image = new Image();

  x = 0;
  y = 0;
  width = 100;
  height = 100;

  constructor(gameMap: GameMap) {
    this.gameMap = gameMap;
    this.image.src = "assets/overworld/vdu_tex_grstone.png";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
