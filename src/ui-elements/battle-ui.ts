import { Game } from "../game";
import { EndTurnButton } from "./end-turn-button";

export class BattleUI {
  game: Game;
  endTurnButton: EndTurnButton;

  constructor(game: Game) {
    this.game = game;
    this.endTurnButton = new EndTurnButton(this);
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    this.endTurnButton.draw(ctx);
  }
}
