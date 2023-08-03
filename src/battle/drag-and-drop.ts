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
    const mouse = $store.mouse;
    const canvas = $store.canvas;
    const battleManager = $store.battleManager;
    const dragAndDrop = $store.dragAndDrop;

    battleManager.player.deck.cardsInHand.forEach((card: Card) => {
      if (rectRectCollision(card, mouse) && !card.isUnPlayable) {
        battleManager.selectedCard = card;

        canvas.addEventListener("mousemove", dragAndDrop.onMouseMove);
        canvas.addEventListener("mouseup", dragAndDrop.onMouseUp);
      }
    });
  }

  onMouseMove(event: Event) {
    const battleManager = $store.battleManager;
    const mouse = $store.mouse;
    const selectedCard = $store.battleManager.selectedCard;

    [battleManager.player, ...battleManager.enemies].forEach((unit: Unit) => {
      if (rectRectCollision(mouse, unit)) {
        unit.targetMark = true;
      } else {
        unit.targetMark = false;
      }
    });

    if (selectedCard) {
      selectedCard.xPercentage = mouse.xPercentage;
      selectedCard.yPercentage = mouse.yPercentage;
    }
  }

  onMouseUp(event: Event) {
    const battleManager = $store.battleManager;
    const selectedCard = battleManager.selectedCard;
    const dragAndDrop = $store.dragAndDrop;
    const mouse = $store.mouse;

    const target: Unit | undefined = [
      battleManager.player,
      ...battleManager.enemies,
    ].find((unit: Unit) => rectRectCollision(unit, mouse));

    if (target) {
      selectedCard?.playCard(battleManager.player, target);
      battleManager.checkIfUnitsDied();

      $store.canvas.removeEventListener("mouseup", dragAndDrop.onMouseUp);
      $store.canvas.removeEventListener("mousemove", dragAndDrop.onMouseMove);

      [battleManager.player, ...battleManager.enemies].forEach((unit: Unit) => {
        unit.targetMark = false;
      });

      selectedCard?.deck.updateCardPositions();
      battleManager.selectedCard = undefined;
    } else {
      selectedCard?.deck.updateCardPositions();
      battleManager.selectedCard = undefined;

      $store.canvas.removeEventListener("mouseup", dragAndDrop.onMouseUp);
      $store.canvas.removeEventListener("mousemove", dragAndDrop.onMouseMove);
    }
  }
}
