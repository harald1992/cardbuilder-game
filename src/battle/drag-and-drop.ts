import { $store } from "../store";
import { Unit } from "../units/unit";
import { mouseRectCollision, rectRectCollision } from "../utils/utils";
import { BattleManager } from "./battle-manager";
import { Card } from "./deck/card";

export class DragAndDrop {
  mouse = $store.mouse;
  canvas = $store.canvas;
  battleManager: BattleManager;

  get selectedCard() {
    return this.battleManager.selectedCard;
  }

  constructor(battleManager: BattleManager) {
    this.battleManager = battleManager;
  }

  dragAndDropCards = () => {
    this.canvas.addEventListener("mousedown", this.onMouseDown);
  };

  onMouseDown = (event: Event) => {
    if (!this.battleManager) {
      return;
    }

    this.battleManager?.player.deck.cardsInHand.forEach((card: Card) => {
      if (mouseRectCollision(this.mouse!, card) && !card.isUnPlayable) {
        if (this.battleManager) {
          this.battleManager.selectedCard = card;
        }

        this.canvas.addEventListener("mousemove", this.onMouseMove);
        this.canvas.addEventListener("mouseup", this.onMouseUp);
      }
    });
  };

  onMouseMove = (event: Event) => {
    if (!this.battleManager) {
      return;
    }

    [this.battleManager.player, ...(this.battleManager.enemies || [])].forEach(
      (unit: Unit) => {
        if (mouseRectCollision(this.mouse!, unit)) {
          unit.targetMark = true;
        } else {
          unit.targetMark = false;
        }
      }
    );

    if (this.selectedCard) {
      this.selectedCard.x = this.mouse?.x || 0;
      this.selectedCard.y = this.mouse?.y || 0;
    }
  };

  onMouseUp = (event: Event) => {
    if (!this.battleManager) {
      return;
    }

    const target: Unit | undefined = [
      this.battleManager.player,
      ...(this.battleManager.enemies || []),
    ].find((unit: Unit) => mouseRectCollision(this.mouse!, unit));

    if (target) {
      this.selectedCard?.playCard(this.battleManager.player, target);
      this.battleManager.checkIfUnitsDied();

      $store.canvas.removeEventListener("mouseup", this.onMouseUp);
      $store.canvas.removeEventListener("mousemove", this.onMouseMove);

      [this.battleManager?.player, ...this.battleManager.enemies].forEach(
        (unit: Unit) => {
          unit.targetMark = false;
        }
      );

      this.selectedCard?.deck.updateCardPositions();
      this.battleManager.selectedCard = undefined;
    } else {
      this.selectedCard?.deck.updateCardPositions();
      this.battleManager.selectedCard = undefined;

      this.canvas.removeEventListener("mouseup", this.onMouseUp);
      this.canvas.removeEventListener("mousemove", this.onMouseMove);
    }
  };

  removeEventListeners() {
    this.canvas.removeEventListener("mousedown", this.onMouseDown);
  }
}
