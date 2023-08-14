import { GameObject } from "../classes/game-object";
import {
  $dungeonTileDictionary,
  // $dungeonWallDictionary,
} from "../dictionaries/tile-dictionary";
import { TileType } from "../models/models";
import { clamp, rectRectCollision } from "../utils/utils";
import { Cell } from "./map-generation/cell";
import { Coordinates, Room } from "./map-generation/room";
// import { MapGenerator } from "./map-generation/map-generator";
import { Overworld } from "./overworld";
import { Tile } from "./tile";
import { Wall } from "./wall";

export class GameMap {
  overworld: Overworld;
  terrainArray: (Tile | Wall)[] = [];

  map: Cell[] = [];
  rows = 10;
  columns = 10;

  // amountOfRooms = 3;
  rooms: Room[] = [];

  get tileSize() {
    let tileSize = Math.ceil(0.1 * this.overworld.game.main.width) || 0;
    // return Math.ceil(0.1 * this.overworld.game.main.width) || 0;
    // return 130;
    // tileSize = Math.round(tileSize);
    // console.log(tileSize);

    return tileSize;
  }

  get mapXMax(): number {
    const lastTerrain = this.terrainArray[this.terrainArray.length - 1];
    return lastTerrain?.x;
  }

  get mapYMax(): number {
    const lastTerrain = this.terrainArray[this.terrainArray.length - 1];
    return lastTerrain?.y;
  }

  constructor(overworld: Overworld) {
    this.overworld = overworld;
  }

  get floorTiles() {
    return [...this.terrainArray].filter(
      (tile: GameObject) => tile instanceof Tile
    );
  }

  init() {
    this.generateRandomDungeon();
    // this.generateWalls();
    // this.generateRoomsAndCorridors(5);

    this.transformMapIntoTerrainArray();
  }

  generateRandomDungeon() {
    this.createGrid();
    this.generateRooms(3);
  }

  createGrid() {
    for (let y = 0; y < this.columns; y++) {
      for (let x = 0; x < this.rows; x++) {
        const element = new Cell(x, y, TileType.WALL);
        this.map.push(element);
      }
    }
  }

  generateRooms(amountOfRooms = 0) {
    for (var i = 0; i < amountOfRooms; i++) {
      var newRoom = this.createRandomNonCollidingRoom();
      this.rooms.push(newRoom);

      if (i > 0) {
        //make corridors
        this.hCorridor(
          this.rooms[i - 1].center.x,
          newRoom.center.x,
          this.rooms[i - 1].center.y,
          newRoom.center.y
        );
        // vCorridor(
        //   rooms[i - 1].center[0],
        //   room.center[0],
        //   rooms[i - 1].center[1],
        //   room.center[1]
        // );
      }
    }

    this.incoorporateRoomsIntoTerrainArray();
  }

  createRandomNonCollidingRoom(): Room {
    let newRoom: Room = this.createRandomRoom();
    const createNewRoom = () => {
      newRoom = this.createRandomRoom();
      let collideWithOtherRooms = this.rooms.some((room: Room) =>
        rectRectCollision(room, newRoom)
      );
      if (collideWithOtherRooms) {
        createNewRoom();
      }
    };
    createNewRoom();

    return newRoom;
  }

  createRandomRoom() {
    let x = clamp(Math.floor(Math.random() * this.rows), 1, this.rows - 2);
    let y = clamp(
      Math.floor(Math.random() * this.columns),
      1,
      this.columns - 2
    );

    const room: Room = new Room(x, y);
    return room;
  }

  hCorridor(x1: number, x2: number, y1: number, y2: number) {
    let disX = 0;
    //horizontal corridor creator
    if (x1 > x2) {
      //if the first room is further towards the right then the second one
      disX = x1 - x2; //find the distance between rooms
      disX += 1;

      this.map.forEach((cell: Cell) => {
        if (
          cell.x >= x2 &&
          cell.x < x2 + disX &&
          cell.y < y2 + 1 &&
          cell.y > y2 - 1
        ) {
          cell.tileType = TileType.FLOOR;
        }
      });
    } //if the second room is further towards the right then the first one
    else {
      disX = x2 - x1; //find the distance between rooms
      disX += 1;

      this.map.forEach((cell: Cell) => {
        if (
          cell.x >= x1 &&
          cell.x < x1 + disX &&
          cell.y < y1 + 1 &&
          cell.y > y1 - 1
        ) {
          cell.tileType = TileType.FLOOR;
        }
      });

      // for (var i = 0; i < grid.length; i++) {
      //   grid[i].carveH(disX, x1, y1); //carve out corridor
      // }
    }
  }

  // function vCorridor(x1, x2, y1, y2) {
  //   //vertical corridor creator
  //   var x;

  //   if (y1 > y2) {
  //     //if the first room is further towards the bottom then the second one
  //     disY = y1 - y2; //find the distance between rooms
  //     disY += 1;

  //     if (x2 + (disX - 1) > x1 + (disX - 1)) {
  //       //find the correct x coord
  //       x = x2;
  //     } else {
  //       x = x2 + (disX - 1);
  //     }

  //     for (var i = 0; i < grid.length; i++) {
  //       grid[i].carveV(disY, x, y2); //carve out corridor
  //     }
  //   } //if the second room is further towards the bottom then the first one
  //   else {
  //     disY = y2 - y1; //find the distance between rooms
  //     disY += 1;

  //     if (x1 + (disX - 1) > x2 + (disX - 1)) {
  //       //find the correct x coord
  //       x = x1;
  //     } else {
  //       x = x1 + (disX - 1);
  //     }

  //     for (var i = 0; i < grid.length; i++) {
  //       grid[i].carveV(disY, x, y1); //carve out corridor
  //     }
  //   }
  // }

  incoorporateRoomsIntoTerrainArray() {
    this.rooms.forEach((room: Room) => {
      room.allCellCoordinates.forEach((tile: Coordinates) => {
        this.map.forEach((cell: Cell) => {
          if (cell.x === tile.x && cell.y === tile.y) {
            cell.tileType = TileType.FLOOR;
          }
        });
      });
    });
  }

  // generateRoom() {
  //   // console.log(this.map);
  // }

  transformMapIntoTerrainArray() {
    this.terrainArray = this.map.map((cell: Cell) => {
      switch (cell.tileType) {
        case TileType.WALL:
          return new Wall(this, cell.x * this.tileSize, cell.y * this.tileSize);
          break;

        case TileType.FLOOR:
          return new Tile(this, cell.x * this.tileSize, cell.y * this.tileSize);
          break;

        default:
          return new Wall(this, cell.x * this.tileSize, cell.y * this.tileSize);
          break;
      }
    });
  }

  // generateWalls() {
  //   let walls: (Tile | Wall)[] = [];

  //   for (var y = 0; y < this.rows; ++y) {
  //     for (var x = 0; x < this.columns; ++x) {
  //       // const newWall = new Wall(this, x * this.tileSize, y * this.tileSize);

  //       const newWall = new Tile(this, x * this.tileSize, y * this.tileSize);

  //       walls.push(newWall);
  //     }
  //   }

  //   this.terrainArray = walls;
  // }

  // changeTileToFloorTile(x: number, y: number) {
  //   const tileIndex = this.getTileIndexByCoordinates(
  //     x * this.tileSize,
  //     y * this.tileSize
  //   );

  //   if (tileIndex) {
  //     const newTile = this.generateRandomDungeonTile(x, y);
  //     this.terrainArray[tileIndex] = newTile;
  //   }
  // }

  // generateRandomTiles() {
  //   for (var y = 0; y < this.rows; ++y) {
  //     for (var x = 0; x < this.columns; ++x) {
  //       if (Math.random() < 0.1) {
  //         const tileIndex = this.getTileIndexByCoordinates(
  //           x * this.tileSize,
  //           y * this.tileSize
  //         );

  //         if (tileIndex) {
  //           const newTile = this.generateRandomDungeonTile(x, y);
  //           this.terrainArray[tileIndex] = newTile;
  //         }
  //       }
  //     }
  //   }
  // }

  // // add organized rooms and corridors that are definitely passable
  // generateRoomsAndCorridors(roomAmount = 3) {
  //   let rooms: any = [];

  //   for (let i = 0; i < roomAmount; i++) {
  //     const room = this.getRandomCoordinates();

  //     room.x = Math.min(Math.max(room.x, 2), this.columns - 2); // clamp these so they are not on the edge
  //     room.y = Math.min(Math.max(room.y, 2), this.rows - 2);
  //     rooms.push(room);
  //   }

  //   for (const room of rooms) {
  //     this.generateRoom(room.x, room.y);
  //     console.log(room.x, room.y);
  //   }

  //   for (let p = 0; p < roomAmount - 1; p++) {
  //     // this.createPathTo(rooms[p].x, rooms[p].y, rooms[p + 1].x, rooms[p + 1].y);
  //   }
  // }

  // generateRoom(middleTileX: number, middleTileY: number) {
  //   // first 3 vs 3 to test
  //   for (var y = middleTileY - 1; y <= middleTileY + 1; y++) {
  //     for (var x = middleTileX - 1; x <= middleTileX + 1; x++) {
  //       const tileIndex = this.getTileIndexByCoordinates(
  //         x * this.tileSize,
  //         y * this.tileSize
  //       );
  //       console.log(tileIndex);

  //       if (tileIndex && x <= this.columns && y <= this.rows) {
  //         const newTile = this.generateRandomDungeonTile(x, y);
  //         this.terrainArray[tileIndex] = newTile;
  //       }
  //     }
  //   }
  // }

  // createPathTo(startX: number, startY: number, endX: number, endY: number) {
  //   const dX = Math.sign(endX - startX);
  //   const dY = Math.sign(endY - startY);

  //   let currentX = startX;
  //   let currentY = startY;

  //   while (currentX != endX || currentY != endY) {
  //     const walkDirectionX = Math.round(Math.random()) === 0;

  //     if (walkDirectionX && currentX != endX) {
  //       currentX += dX;
  //       this.changeTileToFloorTile(currentX, currentY);
  //     } else if (currentY !== endY) {
  //       currentY += dY;
  //       this.changeTileToFloorTile(currentX, currentY);
  //     }
  //   }
  // }

  // // generateGameObjects() {
  // //   const allowedTiles = $store
  // //     .getTerrainArray()
  // //     .filter((tile) => tile.bluePrint.canMove);
  // //   let gameObjects = [];

  // //   let randomTile = utilService.getRandomItemFromArray(allowedTiles);
  // //   // gameObjects.push(new Person(4, randomTile.x, randomTile.y, 10, "player"));
  // //   gameObjects.push(new Person(4, 3, 3, 10, "player"));

  // //   randomTile = utilService.getRandomItemFromArray(allowedTiles);
  // //   gameObjects.push(new Person(6, randomTile.x, randomTile.y, 2));

  // //   randomTile = utilService.getRandomItemFromArray(allowedTiles);
  // //   gameObjects.push(new Person(5, randomTile.x, randomTile.y, 3));

  // //   $store.setGameObjects(gameObjects);
  // // }

  // getRandomCoordinates(): { x: number; y: number } {
  //   const nTilesW = this.columns;
  //   const nTilesH = this.rows;
  //   const x = Math.floor(Math.random() * nTilesW);
  //   const y = Math.floor(Math.random() * nTilesH);
  //   return { x, y };
  // }

  // getTileIndexByCoordinates(x: number, y: number) {
  //   const object = { x, y, width: 1, height: 1 };

  //   return this.terrainArray.findIndex((tile: Tile | Wall) => {
  //     return rectRectCollision(tile, object);
  //     // return Math.round(tile.x) &&
  //   });
  // }

  // generateRandomDungeonTile(x: number, y: number): Tile {
  //   const randomDungeonTileIndex = Math.floor(
  //     Math.random() * $dungeonTileDictionary.length
  //   );
  //   const randomTileConfig = $dungeonTileDictionary[randomDungeonTileIndex];

  //   const newTile = new Tile(
  //     this,
  //     x * this.tileSize,
  //     y * this.tileSize,
  //     randomTileConfig
  //   );
  //   return newTile;
  // }
}
