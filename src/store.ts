import { Game } from "./game";
import { Enemy } from "./units/enemies/enemy";
import { Player } from "./units/player";

declare const window: any;

class Store {
  constructor() {}

  getGame(): Game {
    const game = window.game;
    // if (game) {
    return window.game;
    // }
  }

  setGame(game: Game) {
    window.game = game;
  }

  // getCasterAndTarget(): { caster: Player | Enemy; target: Player | Enemy; } {
  //   const game: Game = this.getGame();
  //   if (game.battleManager.turnHandler.isPlayersTurn) {
  //     return { caster: game.player, target: game.enemy };
  //   } else {
  //     return { caster: game.enemy, target: game.player };
  //   }
  // }

  getPlayer(): Player {
    return this.getGame().player;
  }

  // getEnemies(): Enemy[] {
  //   // return [this.getGame().enemy];
  // }
}

export const $store = new Store();
