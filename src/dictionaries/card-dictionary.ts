import { Card, CardType } from "../battle/deck/card";
import { Deck } from "../battle/deck/deck";
import { Enemy } from "../units/enemy";
import { Player } from "../units/player";
import { Unit } from "../units/unit";

export type CardConfig = {
  cost: number;
  title: string;
  body: string;
  imgSrc: string;
  background?: string;
  isUnPlayable?: boolean;
  // effect: (caster: Player | Enemy, target: Player | Enemy) => void;
  effect: (caster: Unit, target: Unit) => void;
};

export enum CardTitle {
  JUNK = "Junk",
  BITE = "Bite",
  LIGHTNING_SPARK = "Lightning Spark",
  LIGHTNING_BOLT = "Lightning Bolt",
  HEALING_AID = "Healing Aid",
  LIBRARY = "Library",
  STRIKE = "Strike",
}

export function getCardByTitles(deck: Deck, titles: CardTitle[] | string[]) {
  let cards: Card[] = [];
  titles.forEach((title: CardTitle | string) => {
    $cardDictionary.forEach((cardConfig: CardConfig) => {
      if (cardConfig.title === title) {
        cards.push(new Card(deck, cardConfig));
      }
    });
  });

  return cards;
}

export const $cardDictionary: CardConfig[] = [
  {
    cost: 0,
    title: CardTitle.JUNK,
    body: "Unplayable",
    imgSrc: "assets/cards/plc_creats.png",
    background: CardType.MISC,
    isUnPlayable: true,
    effect: (caster: Unit, target: Unit) => {},
  },

  {
    cost: 1,
    title: CardTitle.BITE,
    body: "Deal 2 damage, heal 1 hp",
    imgSrc: "assets/cards/bite.jpg",
    background: CardType.MISC,
    effect: (caster: Unit, target: Unit) => {
      target.damage(2);
      caster.heal(1);
    },
  },

  {
    cost: 1,
    title: CardTitle.LIGHTNING_SPARK,
    body: "Deal 2 damage. 30% stun",
    imgSrc: "assets/cards/lightning-spark.jpg",
    background: CardType.OFFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      target.damage(2);

      if (target.isStunned) {
        return;
      }
      let isStunned = Math.random() <= 0.3;
      target.isStunned = isStunned;
    },
  },

  {
    cost: 2,
    title: CardTitle.LIGHTNING_BOLT,
    body: "Deal 5 damage",
    imgSrc: "assets/cards/Lightning-bolt.png",
    background: CardType.OFFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      target.damage(5);
    },
  },

  {
    cost: 2,
    title: CardTitle.HEALING_AID,
    body: "Heal 2 hp",
    imgSrc: "assets/cards/heal.jpg",
    background: CardType.DEFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      target.heal(2);
    },
  },

  {
    cost: 1,
    title: CardTitle.LIBRARY,
    body: "Draw 3 Cards",
    imgSrc: "assets/cards/book.jpg",
    background: CardType.INCOME,
    effect: (caster: Unit, target: Unit) => {
      target.deck.drawCards(3);
    },
  },

  {
    cost: 1,
    title: CardTitle.STRIKE,
    body: "Deal 3 damage",
    imgSrc: "assets/cards/slash.jpg",
    background: CardType.MISC,
    effect: (caster: Unit, target: Unit) => {
      target.damage(3);
    },
  },
];
