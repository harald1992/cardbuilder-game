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

  canMove = true;

  constructor(
    gameMap: GameMap,
    x = 0,
    y = 0,
    tileName: TileName = TileName.STONE
  ) {
    super(gameMap.overworld.game, x, y, 0.1, 0.1);
    this.gameMap = gameMap;

    let tileConfig: TileConfig =
      $tileDictionary.find(
        (enemyConfig: TileConfig) => enemyConfig.name === tileName
      ) || $tileDictionary[0];

    this.canMove = tileConfig.canMove;
    this.image.src = tileConfig.src;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.drawX, this.drawY, this.width, this.height);
  }
}
