import {
  $cardDictionary,
  CardConfig,
  getCardByTitles,
} from "../../dictionaries/card-dictionary";
import { Unit } from "../../units/unit";
import { Card } from "./card";
import { DeckAndDiscardPile } from "./deck-and-discard-pile";

function duplicateCard(deck: Deck, card: Card) {
  const newCard = getCardByTitles(deck, [card.title])[0];
  return newCard;
}

export class Deck {
  unit: Unit;
  allCards: Card[] = [];
  cardsInHand: Card[] = [];
  cardsInDeck: Card[] = [];
  cardsInDiscard: Card[] = [];
  lastCardAmount = 0;

  deckAndDiscardPile: DeckAndDiscardPile;

  get startingX() {
    let gameWidth = this.unit.game.main.width;
    let cardsInHandWidth =
      this.cardsInHand.length * this.cardsInHand[0].width || 0;
    let startingX = (gameWidth - cardsInHandWidth) / 2;

    return startingX;
  }

  get startingY() {
    const card = this.allCards[0].height;
    const gameHeight = this.unit.game.main.height;
    const difference = gameHeight - card;
    return difference;
  }

  constructor(unit: Unit) {
    this.unit = unit;

    this.deckAndDiscardPile = new DeckAndDiscardPile(this);
  }

  init() {
    this.cardsInDeck.push(...this.allCards.sort(() => Math.random() - 0.5));
  }

  shuffledDeck(deck: Card[]): Card[] {
    let shuffledDeck: Card[] = [];
    shuffledDeck.push(...deck.sort(() => Math.random() - 0.5));
    return shuffledDeck;
  }

  update(deltaTime: number) {
    if (this.cardsInHand.length !== this.lastCardAmount) {
      this.updateCardPositions();
      this.lastCardAmount = this.cardsInHand.length;
    }
  }

  updateCardPositions() {
    this.cardsInHand.forEach((card: Card, index: number) => {
      card.x = this.startingX + index * card.width;
      card.y = this.startingY || 0;
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.unit.isPlayer) {
      this.deckAndDiscardPile.draw(ctx);
      this.cardsInHand.forEach((card) => card.draw(ctx));
    } else {
      // this.cardsInHand.forEach((card) => card.draw(ctx));
    }
  }

  drawCard() {
    if (this.cardsInDeck.length === 0) {
      console.log("Deck is empty. Cannot draw a card.");
      this.shuffleDiscardPileInDeck();
    }
    if (this.cardsInHand.length >= 9) {
      console.log("your hand is full");
      return;
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
    this.updateCardPositions();
  }

  shuffleDiscardPileInDeck() {
    this.cardsInDiscard.forEach((card: Card) => {
      this.shuffleDiscardCardInDeck(card);
    });
  }

  shuffleDiscardCardInDeck(cardToShuffleBack: Card) {
    const newCard = duplicateCard(this, cardToShuffleBack);
    this.cardsInDiscard = this.cardsInDiscard.filter(
      (card: Card) => card.id !== cardToShuffleBack.id
    );
    this.cardsInDeck.push(newCard);

    this.cardsInDeck = this.shuffledDeck(this.cardsInDeck);
  }

  discardCard(cardToDiscard: Card) {
    const newCard = duplicateCard(this, cardToDiscard);
    this.cardsInHand = this.cardsInHand.filter(
      (card: Card) => card.id !== cardToDiscard.id
    );
    this.cardsInDiscard.push(newCard);
  }

  discardHand() {
    this.cardsInHand.forEach((card: Card) => {
      this.discardCard(card);
    });
  }
}
