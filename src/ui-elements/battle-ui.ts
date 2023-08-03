import { Game } from "../game";
import { EndTurnButton } from "./end-turn-button";

export class BattleUI {
  game: Game;
  endTurnButton: EndTurnButton;

  get drawableItems() {
    return this.endTurnButton;
  }

  constructor(game: Game) {
    this.game = game;
    this.endTurnButton = new EndTurnButton(this);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.endTurnButton.draw(ctx);
  }
}
