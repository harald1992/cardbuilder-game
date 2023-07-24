import { Enemy } from "./enemy";
import { Player } from "./player";

declare const window: any;

class Store {
  constructor() {}

  getGame() {
    const game = window.game;
    if (game) {
      return window.game;
    } else {
      setTimeout(() => {
        return window.game;
      });
    }
  }

  getCasterAndTarget(): { caster: Player | Enemy; target: Player | Enemy } {
    const game = this.getGame();
    if (game.isPlayerTurn) {
      return { caster: game.player, target: game.enemy };
    } else {
      return { caster: game.enemy, target: game.player };
    }
  }
}

export const $store = new Store();
