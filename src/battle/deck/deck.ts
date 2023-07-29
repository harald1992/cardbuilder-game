import {
  $cardDictionary,
  CardConfig,
  getCardByTitles,
} from "../../dictionaries/card-dictionary";
import { Unit } from "../../units/unit";
import { Card } from "./card";

function duplicateCard(unit: Unit, card: Card) {
  const newCard = getCardByTitles(unit, [card.title])[0];
  return newCard;
}

export class Deck {
  unit: Unit;
  allCards: Card[] = [];
  cardsInHand: Card[] = [];
  cardsInDeck: Card[] = [];
  cardsInDiscard: Card[] = [];
  lastCardAmount = 0;

  get startingX() {
    let gameWidth = this.unit.game.main.width;
    let cardsInHandWidth = this.cardsInHand.length * this.cardsInHand[0].width;
    let startingX = (gameWidth - cardsInHandWidth) / 2;
    return startingX;
  }

  constructor(unit: Unit) {
    this.unit = unit;
  }

  init() {
    this.cardsInDeck.push(...this.allCards.sort(() => Math.random() - 0.5));
  }

  update(deltaTime: number) {
    if (this.cardsInHand.length !== this.lastCardAmount) {
      this.cardsInHand.forEach((card: Card, index: number) => {
        card.x = this.startingX + index * card.width;
        card.y = this.unit.isPlayer
          ? this.unit.game.main.height - card.height
          : 0;
      });

      this.lastCardAmount = this.cardsInHand.length;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.unit.isPlayer) {
      this.cardsInHand.forEach((card) => card.draw(ctx));
    } else {
      this.cardsInHand.forEach((card) => card.draw(ctx));
    }
  }

  drawCard() {
    if (this.cardsInDeck.length === 0) {
      console.log("Deck is empty. Cannot draw a card.");
      this.shuffleDiscardPileInDeck();
    }
    const card = this.cardsInDeck.shift();
    if (card) {
      this.cardsInHand.push(card);
    }
  }

  drawCards(amount = 5) {
    for (let i = 0; i < amount; i++) {
      if (this.cardsInDeck.length === 0) {
        this.shuffleDiscardPileInDeck();
      }

      this.drawCard();
    }
  }

  shuffleDiscardPileInDeck() {
    this.cardsInDiscard.forEach((card: Card) => {
      this.shuffleDiscardCardInDeck(card);
    });
  }

  shuffleDiscardCardInDeck(cardToShuffleBack: Card) {
    const newCard = duplicateCard(this.unit, cardToShuffleBack);
    this.cardsInDiscard = this.cardsInDiscard.filter(
      (card: Card) => card.id !== cardToShuffleBack.id,
    );
    this.cardsInDeck.push(newCard);
  }

  discardCard(cardToDiscard: Card) {
    const newCard = duplicateCard(this.unit, cardToDiscard);
    this.cardsInHand = this.cardsInHand.filter(
      (card: Card) => card.id !== cardToDiscard.id,
    );
    this.cardsInDiscard.push(newCard);
  }

  discardHand() {
    this.cardsInHand.forEach((card: Card) => {
      this.discardCard(card);
    });
  }
}
