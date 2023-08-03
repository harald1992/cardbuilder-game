import { Overworld } from "./overworld";
import { Tile } from "./tile";

export class GameMap {
  overworld: Overworld;
  terrainArray: Tile[] = [];

  constructor(overworld: Overworld) {
    this.overworld = overworld;
  }

  init() {
    this.generateRandomMap();
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawTerrainTiles(ctx);
  }

  drawTerrainTiles(ctx: CanvasRenderingContext2D) {
    const terrainArray = this.terrainArray;

    for (const tile of terrainArray) {
      tile.draw(ctx);
    }
  }

  generateRandomMap() {
    for (let i = 0; i < 5; i++) {
      const tile = new Tile(this);
      tile.x = i * tile.width;
      tile.y = 0;
      this.terrainArray.push(tile);
    }
  }
  // this.generateMainLayer();
  // this.generateRoomsAndCorridors(5);
  // this.generateGameObjects();
}

// // generate random tiles at every coordinate.
// generateMainLayer() {
//   const map = $store.getMapSettings();
//   let terrainArray = [];

//   for (var y = 0; y < map.nTilesH; ++y) {
//     for (var x = 0; x < map.nTilesW; ++x) {
//       const newTile = new Tile(1, x, y);

//       terrainArray.push(newTile);
//     }
//   }
//   $store.setTerrainArray(terrainArray);
// }

// // add organized rooms and corridors that are definitely passable
// generateRoomsAndCorridors(roomAmount = 3) {
//   const map = $store.getMapSettings();

//   let rooms = [];

//   for (let i = 0; i < roomAmount; i++) {
//     const room = utilService.getRandomCoordinates();

//     room.x = Math.min(Math.max(room.x, 1), map.nTilesW); // clamp these so they are not on the edge
//     room.y = Math.min(Math.max(room.y, 1), map.nTilesH);
//     rooms.push(room);
//   }

//   for (const room of rooms) {
//     this.generateRoom(room.x, room.y);
//   }

//   for (let p = 0; p < roomAmount - 1; p++) {
//     this.createPathTo(rooms[p].x, rooms[p].y, rooms[p + 1].x, rooms[p + 1].y);
//   }
// }

// createPathTo(startX, startY, endX, endY) {
//   const dX = Math.sign(endX - startX);
//   const dY = Math.sign(endY - startY);

//   let currentX = startX;
//   let currentY = startY;

//   while (currentX != endX || currentY != endY) {
//     const walkDirectionX = Math.round(Math.random()) === 0;

//     if (walkDirectionX && currentX != endX) {
//       currentX += dX;
//       this.changeTile(currentX, currentY, 0);
//     } else if (currentY !== endY) {
//       currentY += dY;
//       this.changeTile(currentX, currentY, 0);
//     }
//   }
// }

// changeTile(x, y, tileBlueprintNumber) {
//   let terrainArray = $store.getTerrainArray();
//   let index = utilService.getTileIndexByCoordinates(x, y);
//   terrainArray[index] = new Tile(tileBlueprintNumber, x, y);
//   $store.setTerrainArray(terrainArray);
// }

// generateRoom(middleTileX, middleTileY) {
//   let terrainArray = $store.getTerrainArray();

//   // first 3 vs 3 to test
//   for (var y = middleTileY - 1; y <= middleTileY + 1; y++) {
//     for (var x = middleTileX - 1; x <= middleTileX + 1; x++) {
//       const tileIndex = utilService.getTileIndexByCoordinates(x, y);
//       if (tileIndex) {
//         const newTile = new Tile(0, x, y);

//         terrainArray[tileIndex] = newTile;
//       }
//     }
//   }
//   $store.setTerrainArray(terrainArray);
// }

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

// drawGrid(ctx) {
//   if (ctx == null) {
//     return;
//   }
//   const map = $store.getMapSettings();
//   for (var y = 0; y < map.nTilesH; ++y) {
//     for (var x = 0; x < map.nTilesW; ++x) {
//       // ctx.lineWidth = 0.1;
//       ctx.lineWidth = 1;

//       ctx.strokeStyle = "gray";

//       ctx.strokeRect(
//         x * map.tileSize,
//         y * map.tileSize,
//         map.tileSize,
//         map.tileSize
//       );
//     }
//   }
// }
// }
