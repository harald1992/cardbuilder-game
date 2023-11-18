import { GameObject } from "../classes/game-object";
import { getNewDungeon } from "./map-generation-working/create-dungeon";
import { Overworld } from "./overworld";
import { Tile } from "./tile";
import { Wall } from "./wall";

export class GameMap {
  overworld: Overworld;
  terrainArray: (Tile | Wall)[] = [];

  get tileSize() {
    let tileSize = Math.ceil(0.1 * this.overworld.game.main.width) || 0;
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
  }

  generateRandomDungeon() {
    const dungeon = getNewDungeon();
    this.convertDungeonBlueprintToRealDungeon(dungeon);
  }

  convertDungeonBlueprintToRealDungeon(dungeon: string[][]) {
    for (let y = 0; y < dungeon[0].length; y++) {
      for (let x = 0; x < dungeon.length; x++) {
        const tile: any = dungeon[x][y];
        if (tile === "#") {
          const convertedTile = new Wall(
            this,
            x * this.tileSize,
            y * this.tileSize
          );
          this.terrainArray.push(convertedTile);
        } else {
          const convertedTile = new Tile(
            this,
            x * this.tileSize,
            y * this.tileSize
          );
          this.terrainArray.push(convertedTile);
        }
      }
    }
  }
}
