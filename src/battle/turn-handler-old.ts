// import { Game } from "../game";
// import { Unit } from "../units/unit";
// import { Card } from "./deck/card";

// export class TurnHandler {
//   game: Game;
//   isPlayersTurn = true;

//   constructor(game: Game) {
//     this.game = game;
//   }

//   init() {
//     this.isPlayersTurn = true;
//     this.upkeep();
//   }

//   switchTurns() {
//     const previousCaster = this.isPlayersTurn
//       ? this.game.player
//       : this.game.enemy;
//     previousCaster.deck.discardHand();

//     this.isPlayersTurn = !this.isPlayersTurn;

//     console.log("isPlayersturn = ", this.isPlayersTurn);
//     this.upkeep();

//     if (this.isPlayersTurn) {
//     } else {
//       this.enemyTurn();
//     }
//   }

//   upkeep() {
//     let caster = this.isPlayersTurn ? this.game.player : this.game.enemy;
//     console.log(caster);

//     caster.deck.drawCards(5);
//     caster.currentMp = caster.maxMp;

//     if (caster.isStunned) {
//       console.log(typeof caster, " is stunned");

//       caster.isStunned = false;
//       return this.switchTurns();
//     }
//   }

//   enemyTurn() {
//     let caster = this.game.enemy;
//     let target = this.game.player;
//     this.playPossibleCard(caster, target);
//   }

//   playPossibleCard(caster: Unit, target: Unit) {
//     const possibleCardsToPlay = [...this.game.enemy.deck.cardsInHand].filter(
//       (card: Card) => card.cost <= caster.currentMp,
//     );
//     console.log("possible cards to play", possibleCardsToPlay);

//     if (possibleCardsToPlay.length === 0) {
//       return this.switchTurns();
//     }
//     const randomIndex = Math.floor(Math.random() * possibleCardsToPlay.length);
//     const randomCard = possibleCardsToPlay[randomIndex];
//     if (randomCard) {
//       setTimeout(() => {
//         randomCard.playCard(caster, target);
//         this.playPossibleCard(caster, target);
//       }, 100);
//     } else {
//       setTimeout(() => {
//         return this.switchTurns();
//       }, 100);
//     }
//   }
// }
