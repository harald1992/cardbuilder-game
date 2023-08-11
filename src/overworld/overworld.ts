import { Main } from "..";
import { GameObject } from "../classes/game-object";
import { Game } from "../game";
import { $store } from "../store";
import { rectRectCollision } from "../utils/utils";
import { GameMap } from "./gameMap";
import { InputHandler } from "./input-handler";
import { OverworldEnemy } from "./overworld-enemy";
// import { KeyboardHandler } from "./keyboard-handler";
import { OverworldPlayer } from "./overworld-player";
import { Tile } from "./tile";
import { Wall } from "./wall";

export class Overworld {
  game: Game;
  gameMap: GameMap;
  overworldPlayer: OverworldPlayer;
  inputHandler: InputHandler = new InputHandler(this);
  overworldEnemies: OverworldEnemy[] = [];

  get clickableItems() {
    return [...this.overworldEnemies, this.overworldPlayer];
  }

  get drawableItems() {
    return [
      ...this.gameMap.terrainArray,
      ...this.overworldEnemies,
      this.overworldPlayer,
    ];
  }

  constructor(game: Game) {
    this.game = game;
    this.gameMap = new GameMap(this);
    this.overworldPlayer = new OverworldPlayer(this, this.game.playerData);
  }

  newGame() {
    this.gameMap.init();
    this.overworldPlayer = new OverworldPlayer(this, this.game.playerData);

    this.spawnPlayer();
    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
  }

  spawnPlayer() {
    const { x, y } = this.getRandomUnusedPosition();
    this.overworldPlayer.x = x;
    this.overworldPlayer.y = y;
  }

  spawnEnemy() {
    let overworldEnemy = new OverworldEnemy(this);
    const { x, y } = this.getRandomUnusedPosition();
    overworldEnemy.x = x;
    overworldEnemy.y = y;

    this.overworldEnemies.push(overworldEnemy);
  }

  getRandomUnusedPosition(): { x: number; y: number } {
    const possiblePositions = this.gameMap.terrainArray.filter(
      (tile: Tile | Wall) => tile.canMove
    );

    if (this.clickableItems.length > possiblePositions.length) {
      console.error("not enough room to place object");
      return { x: 0, y: 0 };
    }

    const randomIndex = Math.floor(Math.random() * possiblePositions.length);
    const x = possiblePositions[randomIndex]?.x || 0;
    const y = possiblePositions[randomIndex]?.y || 0;

    let object = {
      x: x,
      y: y,
      width: 0.1,
      height: 0.1,
    };

    while (
      [...this.clickableItems].some((ob: GameObject) =>
        rectRectCollision(object, ob)
      )
    ) {
      const randomIndex = Math.floor(Math.random() * possiblePositions.length);

      const x = possiblePositions[randomIndex]?.x || 0;
      const y = possiblePositions[randomIndex]?.y || 0;
      object = {
        x: x,
        y: y,
        width: 0.1,
        height: 0.1,
      };
    }

    return { x, y };
  }
}
