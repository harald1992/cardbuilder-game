import { Main } from "..";
import { Game } from "../game";
import { $store } from "../store";
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

  update(deltaTime: number) {
    this.overworldEnemies = this.overworldEnemies.filter(
      (enemy: OverworldEnemy) => !enemy.markedForDeletion
    );
  }

  newGame() {
    this.gameMap.init();

    this.addEventListeners();
    this.spawnPlayer();
    this.spawnEnemy();
    this.spawnEnemy();
    this.spawnEnemy();
  }

  spawnPlayer() {
    const { x, y } = this.getRandomStartingPosition();
    this.overworldPlayer.x = x;
    this.overworldPlayer.y = y;
  }

  spawnEnemy() {
    let overworldEnemy = new OverworldEnemy(this);
    const { x, y } = this.getRandomStartingPosition();
    overworldEnemy.x = x;
    overworldEnemy.y = y;

    this.overworldEnemies.push(overworldEnemy);
  }

  getRandomStartingPosition() {
    const possiblePositions = this.gameMap.terrainArray.filter(
      (tile: Tile | Wall) => tile.canMove
    );

    const randomIndex = Math.floor(Math.random() * possiblePositions.length);
    const x = possiblePositions[randomIndex]?.x || 0;
    const y = possiblePositions[randomIndex]?.y || 0;
    return { x, y };
  }

  // startBattle = () => {
  //   this.removeEventListeners();
  //   console.log("strt battle event done");

  //   this.game.startBattle();
  // };

  // // todo: remove whenever we have normal event to prop the battle
  addEventListeners() {
    //   console.log("adding event listener");
    //   this.game.main.canvas.addEventListener("click", this.startBattle);
  }

  removeEventListeners() {
    // console.log("should remove event listener");
    // this.game.main.canvas.removeEventListener("click", this.startBattle);
  }
}
