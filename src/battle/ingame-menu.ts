import { GameState } from "..";
import { BattleManager } from "./battle-manager";

export class IngameMenu {
  battleManager: BattleManager;

  constructor(battleManager: BattleManager) {
    this.battleManager = battleManager;
  }

  init() {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        console.log("trigger event ingame menu");

        // if (this.mainMenuElement.style.display === "none") {
        if (this.battleManager.game.main.gameState === GameState.INGAME) {
          this.battleManager.game.main.changeGameState(GameState.INGAMEPAUSE);
        }
      } else {
        this.battleManager.game.main.changeGameState(GameState.INGAME);
      }
    });
  }
}
