import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";
import { Unit } from "./unit";

export class TurnHandler {
  game: Game;
  isPlayersTurn = true;

  constructor(game: Game) {
    this.game = game;
  }

  init() {
    this.isPlayersTurn = true;
    this.upkeep();
  }

  switchTurns() {
    const caster = this.isPlayersTurn ? this.game.player : this.game.enemy;
    caster.deck.discardHand();

    this.isPlayersTurn = !this.isPlayersTurn;
    console.log('isPlayersturn = ', this.isPlayersTurn);
    this.upkeep();

    if (this.isPlayersTurn) {
    } else {
      this.enemyTurn();
    }
  }

  upkeep() {
    let caster = this.isPlayersTurn ? this.game.player : this.game.enemy;
    console.log(caster);

    // let caster = this.game.player;

    caster.deck.drawCards(5);
    caster.currentMp = caster.maxMp;
    if (caster.isStunned) {
      console.log(typeof caster, ' is stunned');

      caster.isStunned = false;
      return this.switchTurns();
    }
  }


  enemyTurn() {
    let caster = this.game.enemy;
    let target = this.game.player;
    this.playPossibleCard(caster, target);
  }

  playPossibleCard(caster: Unit, target: Unit) {

    const possibleCardsToPlay = this.game.enemy.deck.cardsInHand.filter((card: Card) => { card.cost <= caster.currentMp });
    if (possibleCardsToPlay.length === 0) {
      return this.switchTurns();
    }
    const randomIndex = Math.floor(Math.random() * possibleCardsToPlay.length);
    const randomCard = possibleCardsToPlay[randomIndex];
    if (randomCard) {
      setTimeout(() => {
        randomCard.playCard(caster, target);

      }, 500);
    } else {
      this.switchTurns();
    }
  }
}
