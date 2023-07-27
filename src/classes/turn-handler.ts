import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";

export class TurnHandler {
  game: Game;
  isPlayersTurn = true;

  constructor(game: Game) {
    this.game = game;
  }

  switchTurns() {
    this.isPlayersTurn = !this.isPlayersTurn;
    this.upkeep();

    if (this.isPlayersTurn) {
      this.game.preventCardClick = false;
    } else {
      this.enemyTurn();
    }
  }

  upkeep() {
    const caster = this.isPlayersTurn ? this.game.player : this.game.enemy;
    caster.drawCards(1);
    caster.currentMp += 1;
  }


  enemyTurn() {
    let caster = this.game.enemy;
    let target = this.game.player;

    const enemyCards = this.game.enemy.cards;
    const randomIndex = Math.floor(Math.random() * enemyCards.length);
    const randomCard = enemyCards[randomIndex];
    if (randomCard) {
      setTimeout(() => {

        randomCard.playCard(caster, target);

      }, 500);
    } else {
      this.switchTurns();
    }


  }
}
