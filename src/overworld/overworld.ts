import { Main } from "..";
import { Game } from "../game";
import { $store } from "../store";
import { GameMap } from "./gameMap";

export class Overworld {
  main: Main;
  gameMap: GameMap;

  get game() {
    return this.main.game;
  }

  constructor(main: Main) {
    this.main = main;
    this.gameMap = new GameMap(this);
  }

  init() {
    this.gameMap.init();

    document.addEventListener("click", this.startBattle);
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(0, 0, this.main.width, this.main.height);
    this.gameMap.draw(ctx);
  }

  startBattle() {
    // $store.game.init();
    // this.main.changeGameState()

    document.removeEventListener("click", this.startBattle);
  }
}
