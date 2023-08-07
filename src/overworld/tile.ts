import { GameObject } from "../classes/game-object";
import {
  $tileDictionary,
  TileConfig,
  TileName,
} from "../dictionaries/tile-dictionary";
import { GameMap } from "./gameMap";

export class Tile extends GameObject {
  gameMap: GameMap;

  image = new Image();
  name: string;
  canMove = true;

  spriteConfig?: {
    sourceX: number;
    sourceY: number;
    cutSizeX: number;
    cutSizeY: number;
  };

  constructor(
    gameMap: GameMap,
    x = 0,
    y = 0,
    tileConfig: TileConfig = $tileDictionary[0]
  ) {
    super(
      gameMap.overworld.game,
      x,
      y,
      tileConfig.width || 0.1,
      tileConfig.height || 0.1
    );
    this.gameMap = gameMap;

    this.name = tileConfig.name;
    this.canMove = tileConfig.canMove;
    this.image.src = tileConfig.src;
    this.spriteConfig = tileConfig.spriteConfig;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    if (this.spriteConfig) {
      ctx.drawImage(
        this.image,
        this.spriteConfig.sourceX,
        this.spriteConfig.sourceY,
        this.spriteConfig.cutSizeX,
        this.spriteConfig.cutSizeY,
        this.drawX,
        this.drawY,
        this.width,
        this.height
      );
    } else {
      ctx.drawImage(
        this.image,
        this.drawX,
        this.drawY,
        this.width,
        this.height
      );
    }
  }
}
