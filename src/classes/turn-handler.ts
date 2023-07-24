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

    if (!this.isPlayersTurn) {
      this.enemyTurn();
    }
  }

  enemyTurn() {
    let caster = this.game.enemy;
    let target = this.game.player;

    const enemyCards = this.game.enemy.cards;
    const randomIndex = Math.floor(Math.random() * enemyCards.length);
    const randomCard = enemyCards[randomIndex];

    setTimeout(() => {
      randomCard.effect(caster, target);
    }, 500);

    this.switchTurns();
  }
}
