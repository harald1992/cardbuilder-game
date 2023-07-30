import { Game } from "./game";
import { rectRectCollision } from "./utils/utils";
import { Mouse } from "./mouse";
import { Card } from "./battle/deck/card";

export class MouseHandler {
  game: Game;
  mouse: Mouse;

  get cursor() {
    return this.game.main.canvas.style.cursor;
  }
  set cursor(value: string) {
    this.game.main.canvas.style.cursor = value;
  }

  constructor(game: Game) {
    this.game = game;
    this.mouse = game.mouse;

    this.mouseHoverEffects();

    // this.listenForMouseClick();
  }

  mouseHoverEffects() {
    this.game.main.canvas.addEventListener("mousemove", (event: MouseEvent) => {
      if (
        this.game.clickableItems.some((item: any) =>
          rectRectCollision(item, this.mouse)
        )
      ) {
        this.cursor = "pointer";
      } else {
        this.cursor = "default";
      }
    });

    this.game.main.canvas.addEventListener("click", (event: MouseEvent) => {
      const item = this.game.clickableItems.find((item: any) =>
        rectRectCollision(item, this.mouse)
      );
      console.log(item);
    });
  }

  // listenForMouseClick() {
  //   this.game.main.canvas.addEventListener("click", (e: Event) => {
  //     const isPlayersTurn = this.game.battleManager.turnCycle?.isPlayersTurn;

  //     if (!isPlayersTurn) {
  //       return;
  //     }
  //     this.game.player.deck.cardsInHand.forEach((card: Card) => {
  //       if (rectRectCollision(card, this.mouse)) {
  //         if (isPlayersTurn) {
  //           card.playCard(this.game.player, this.game.enemy);
  //         }
  //       }
  //     });

  //     if (rectRectCollision(this.game.ui.endTurnButton, this.mouse)) {
  //       this.game.turnHandler.switchTurns();
  //     }
  //   });
  // }
}