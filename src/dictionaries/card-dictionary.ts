import { Card, CardType } from "../battle/deck/card";
import { Enemy } from "../units/enemies/enemy";
import { Player } from "../units/player";
import { Unit } from "../units/unit";

export type CardConfig = {
  cost: number;
  title: string;
  body: string;
  imgSrc: string;
  background?: string;
  // effect: (caster: Player | Enemy, target: Player | Enemy) => void;
  effect: (caster: Unit, target: Unit) => void;
};

export enum CardTitle {
  JUNK = "Junk",
  LIGHTNING_SPARK = "Lightning Spark",
  LIGHTNING_BOLT = "Lightning Bolt",
  HEALING_AID = "Healing Aid",
  LIBRARY = "Library",
  LEGENDARY_STRIKE = "Legendary Strike",
}

export function getCardByTitles(unit: Unit, titles: CardTitle[] | string[]) {
  let cards: Card[] = [];
  titles.forEach((title: CardTitle | string) => {
    $cardDictionary.forEach((cardConfig: CardConfig) => {
      if (cardConfig.title === title) {
        cards.push(new Card(unit, cardConfig));
      }
    });
  });

  return cards;
}

export const $cardDictionary: CardConfig[] = [
  {
    cost: 0,
    title: "Junk",
    body: "Does nothing",
    imgSrc: "assets/cards/junk.jpg",
    background: CardType.MISC,
    effect: (caster: Unit, target: Unit) => {},
  },

  {
    cost: 1,
    title: "Lightning Spark",
    body: "Deal 1 damage. 20% stun",
    imgSrc: "assets/cards/lightning-spark.jpg",
    background: CardType.OFFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      target.currentHp -= 1;

      // todo: fix stun loop
      // if (target.isStunned) { return; }
      // let isStunned = Math.random() <= 0.2;
      // target.isStunned = isStunned;
    },
  },

  {
    cost: 2,
    title: "Lightning Bolt",
    body: "Deal 3 damage",
    imgSrc: "assets/cards/Lightning-bolt.png",
    background: CardType.OFFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      target.currentHp -= 2;
    },
  },

  {
    cost: 2,
    title: "Healing Aid",
    body: "Heal 2 hp",
    imgSrc: "assets/cards/heal.jpg",
    background: CardType.DEFENSIVE,
    effect: (caster: Unit, target: Unit) => {
      caster.currentHp += 2;
    },
  },

  {
    cost: 3,
    title: "Library",
    body: "Draw One Card",
    imgSrc: "assets/cards/book.jpg",
    background: CardType.INCOME,
    effect: (caster: Unit, target: Unit) => {
      caster.deck.drawCards(2);
    },
  },

  {
    cost: 5,
    title: "Legendary Strike",
    body: "Deal 10 damage",
    imgSrc: "assets/cards/slash.jpg",
    background: CardType.MISC,
    effect: (caster: Unit, target: Unit) => {
      target.currentHp -= 10;
    },
  },
];

// export let $cardDictionary: (() => Card)[] = [];

// for (const card of cards) {
//   const cardFunction = () => createCardElement(card);

//   $cardDictionary.push(cardFunction);
// }
