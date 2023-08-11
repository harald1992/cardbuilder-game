import { GameObject } from "../classes/game-object";
import {
  $dungeonTileDictionary,
  $tileDictionary,
  // $dungeonWallDictionary,
  TileName,
} from "../dictionaries/tile-dictionary";
import { rectRectCollision } from "../utils/utils";
import { Overworld } from "./overworld";
import { Tile } from "./tile";
import { Wall } from "./wall";

export class GameMap {
  overworld: Overworld;
  terrainArray: (Tile | Wall)[] = [];

  rows = 10;
  columns = 10;

  tileSize = 0;

  get mapXMax() {
    const lastTerrain = this.terrainArray[this.terrainArray.length - 1];
    return lastTerrain.x;
  }

  get mapYMax() {
    const lastTerrain = this.terrainArray[this.terrainArray.length - 1];
    return lastTerrain.y;
  }

  constructor(overworld: Overworld) {
    this.overworld = overworld;
    this.tileSize = 0.1 * this.overworld.game.main.width;
  }

  get floorTiles() {
    return [...this.terrainArray].filter(
      (tile: GameObject) => tile instanceof Tile
    );
  }

  init() {
    this.generateWalls();

    this.generateRoomsAndCorridors(5);
  }

  generateWalls() {
    let walls: Wall[] = [];

    for (var y = 0; y < this.rows; ++y) {
      for (var x = 0; x < this.columns; ++x) {
        const tileSize = 0.1 * this.overworld.game.main.width;

        const newWall = new Wall(this, x * tileSize, y * tileSize);
        walls.push(newWall);
      }
    }

    this.terrainArray = walls;
  }

  changeTileToFloorTile(x: number, y: number) {
    const tileIndex = this.getTileIndexByCoordinates(
      x * this.tileSize,
      y * this.tileSize
    );

    if (tileIndex) {
      const newTile = this.generateRandomDungeonTile(x, y);
      this.terrainArray[tileIndex] = newTile;
    }
  }

  generateRandomTiles() {
    for (var y = 0; y < this.rows; ++y) {
      for (var x = 0; x < this.columns; ++x) {
        if (Math.random() < 0.1) {
          const tileIndex = this.getTileIndexByCoordinates(
            x * this.tileSize,
            y * this.tileSize
          );

          if (tileIndex) {
            const newTile = this.generateRandomDungeonTile(x, y);
            this.terrainArray[tileIndex] = newTile;
          }
        }
      }
    }
  }

  // add organized rooms and corridors that are definitely passable
  generateRoomsAndCorridors(roomAmount = 3) {
    let rooms = [];

    for (let i = 0; i < roomAmount; i++) {
      const room = this.getRandomCoordinates();

      room.x = Math.min(Math.max(room.x, 1), this.columns); // clamp these so they are not on the edge
      room.y = Math.min(Math.max(room.y, 1), this.rows);
      rooms.push(room);
    }

    for (const room of rooms) {
      this.generateRoom(room.x, room.y);
    }

    for (let p = 0; p < roomAmount - 1; p++) {
      this.createPathTo(rooms[p].x, rooms[p].y, rooms[p + 1].x, rooms[p + 1].y);
    }
  }

  generateRoom(middleTileX: number, middleTileY: number) {
    // first 3 vs 3 to test
    for (var y = middleTileY - 1; y <= middleTileY + 1; y++) {
      for (var x = middleTileX - 1; x <= middleTileX + 1; x++) {
        const tileIndex = this.getTileIndexByCoordinates(
          x * this.tileSize,
          y * this.tileSize
        );

        if (tileIndex && x <= this.columns && y <= this.rows) {
          console.log(x, y);
          console.log(this.columns, this.rows);

          const newTile = this.generateRandomDungeonTile(x, y);
          this.terrainArray[tileIndex] = newTile;
        }
      }
    }
  }

  createPathTo(startX: number, startY: number, endX: number, endY: number) {
    const dX = Math.sign(endX - startX);
    const dY = Math.sign(endY - startY);

    let currentX = startX;
    let currentY = startY;

    while (currentX != endX || currentY != endY) {
      const walkDirectionX = Math.round(Math.random()) === 0;

      if (walkDirectionX && currentX != endX) {
        currentX += dX;
        this.changeTileToFloorTile(currentX, currentY);
      } else if (currentY !== endY) {
        currentY += dY;
        this.changeTileToFloorTile(currentX, currentY);
      }
    }
  }

  // generateGameObjects() {
  //   const allowedTiles = $store
  //     .getTerrainArray()
  //     .filter((tile) => tile.bluePrint.canMove);
  //   let gameObjects = [];

  //   let randomTile = utilService.getRandomItemFromArray(allowedTiles);
  //   // gameObjects.push(new Person(4, randomTile.x, randomTile.y, 10, "player"));
  //   gameObjects.push(new Person(4, 3, 3, 10, "player"));

  //   randomTile = utilService.getRandomItemFromArray(allowedTiles);
  //   gameObjects.push(new Person(6, randomTile.x, randomTile.y, 2));

  //   randomTile = utilService.getRandomItemFromArray(allowedTiles);
  //   gameObjects.push(new Person(5, randomTile.x, randomTile.y, 3));

  //   $store.setGameObjects(gameObjects);
  // }

  getRandomCoordinates(): { x: number; y: number } {
    const nTilesW = this.columns;
    const nTilesH = this.rows;
    const x = Math.floor(Math.random() * nTilesW);
    const y = Math.floor(Math.random() * nTilesH);
    return { x, y };
  }

  getTileIndexByCoordinates(x: number, y: number) {
    const object = { x, y, width: 0.1, height: 0.1 };

    return this.terrainArray.findIndex((tile: Tile | Wall) => {
      return rectRectCollision(tile, object);
    });
  }

  generateRandomDungeonTile(x: number, y: number): Tile {
    const randomDungeonTileIndex = Math.floor(
      Math.random() * $dungeonTileDictionary.length
    );
    const randomTileConfig = $dungeonTileDictionary[randomDungeonTileIndex];

    const newTile = new Tile(
      this,
      x * this.tileSize,
      y * this.tileSize,
      randomTileConfig
    );
    return newTile;
  }
}
