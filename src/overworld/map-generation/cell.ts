import { TileType } from "../../models/models";

export class Cell {
  x = 0;
  y = 0;
  tileType: TileType;

  constructor(x: number, y: number, tileType: TileType = TileType.WALL) {
    this.x = x;
    this.y = y;
    this.tileType = tileType;
  }
}
