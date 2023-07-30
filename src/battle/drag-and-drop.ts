import { Game } from "../game";
import { $store } from "../store";
import { Unit } from "../units/unit";
import { rectRectCollision } from "../utils/utils";
import { Card } from "./deck/card";

export class DragAndDrop {
  dragAndDropCards() {
    const canvas = $store.canvas;
    canvas.addEventListener("mousedown", this.onMouseDown);
  }

  onMouseDown(event: Event) {
    const game = $store.game;
    const canvas = $store.canvas;
    const battleManager = $store.battleManager;
    const dragAndDrop = $store.dragAndDrop;

    game.battleManager.player.deck.cardsInHand.forEach((card: Card) => {
      if (rectRectCollision(card, game.mouse) && !card.isUnPlayable) {
        battleManager.selectedCard = card;

        canvas.addEventListener("mousemove", dragAndDrop.onMouseMove);

        canvas.addEventListener("mouseup", dragAndDrop.onMouseUp);
      }
    });
  }

  onMouseMove(event: Event) {
    const game = $store.game;

    [game.battleManager.player, ...game.battleManager.enemies].forEach(
      (unit: Unit) => {
        if (rectRectCollision(game.mouse, unit)) {
          unit.targetMark = true;
        } else {
          unit.targetMark = false;
        }
      }
    );

    const mouse = $store.mouse;
    const selectedCard = $store.battleManager.selectedCard;

    if (selectedCard) {
      selectedCard.xPercentage = mouse.xPercentage;
      selectedCard.yPercentage = mouse.yPercentage;
    }
  }

  onMouseUp(event: Event) {
    const game = $store.game;
    const selectedCard = game.battleManager.selectedCard;
    const dragAndDrop = $store.dragAndDrop;

    const target: Unit | undefined = [
      game.battleManager.player,
      ...game.battleManager.enemies,
    ].find((unit: Unit) => rectRectCollision(unit, game.mouse));

    if (target) {
      selectedCard?.playCard(game.battleManager.player, target);
      game.main.canvas.removeEventListener("mouseup", dragAndDrop.onMouseUp);
      game.main.canvas.removeEventListener(
        "mousemove",
        dragAndDrop.onMouseMove
      );

      [game.battleManager.player, ...game.battleManager.enemies].forEach(
        (unit: Unit) => {
          unit.targetMark = false;
        }
      );

      selectedCard?.deck.updateCardPositions();
      game.battleManager.selectedCard = undefined;
    } else {
      selectedCard?.deck.updateCardPositions();
      game.battleManager.selectedCard = undefined;

      game.main.canvas.removeEventListener("mouseup", dragAndDrop.onMouseUp);

      game.main.canvas.removeEventListener(
        "mousemove",
        dragAndDrop.onMouseMove
      );
    }
  }
}
