import { Main } from ".";
import { Game } from "./game";
import { Enemy } from "./units/enemy";
import { Player } from "./units/player";

declare const window: any;

class Store {
  get main() {
    return window.main;
  }

  set main(main: Main) {
    window.main = main;
  }

  get game() {
    return this.main.game;
  }

  get canvas() {
    return this.main.canvas;
  }

  get battleManager() {
    return this.game?.battleManager;
  }

  get dragAndDrop() {
    return this.battleManager?.dragAndDrop;
  }

  get mouse() {
    return this.game?.mouse;
  }

  constructor() {}

  // getPlayer(): Player | undefined {
  //   return this.game?.battleManager?.player;
  // }

  // getGame(): Game {
  //   return window.game;
  // }

  // setGame(game: Game) {
  //   window.game = game;
  // }

  // canvas = game.main.canvas;

  // getCasterAndTarget(): { caster: Player | Enemy; target: Player | Enemy; } {
  //   const game: Game = this.getGame();
  //   if (game.battleManager.turnHandler.isPlayersTurn) {
  //     return { caster: game.player, target: game.enemy };
  //   } else {
  //     return { caster: game.enemy, target: game.player };
  //   }
  // }

  // getEnemies(): Enemy[] {
  //   // return [this.getGame().enemy];
  // }
}

export const $store = new Store();
