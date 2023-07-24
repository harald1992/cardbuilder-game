import { Card } from "../classes/card";
import { Enemy } from "../classes/enemy";
import { Player } from "../classes/player";

type CardInput = {
  cost: number;
  title: string;
  body: string;
  imgSrc: string;
  effect: (caster: Player | Enemy, target: Player | Enemy) => void;
};

function createCardElement(card: CardInput): Card {
  const cardEl = document.createElement("app-card") as Card;

  cardEl.setAttribute("cost", card.cost.toString());

  cardEl.setAttribute("cardTitle", card.title);
  cardEl.setAttribute("cardBody", card.body);
  cardEl.setAttribute("imgSrc", card.imgSrc);
  cardEl.effect = card.effect;

  return cardEl;
}

const cards: CardInput[] = [
  {
    cost: 1,
    title: "Lightning Spark",
    body: "Deal 1 damage",
    imgSrc: "assets/cards/lightning-spark.jpg",
    effect: (caster: Player | Enemy, target: Player | Enemy) => {
      target.currentHp -= 1;
    },
  },

  {
    cost: 2,
    title: "Lightning Bolt",
    body: "Deal 3 damage",
    imgSrc: "assets/cards/Lightning-bolt.png",
    effect: (caster: Player | Enemy, target: Player | Enemy) => {
      target.currentHp -= 2;
    },
  },

  {
    cost: 2,
    title: "Healing Aid",
    body: "Heal 2 hp",
    imgSrc: "assets/cards/heal.jpg",
    effect: (caster: Player | Enemy, target: Player | Enemy) => {
      caster.currentHp += 2;
    },
  },

  {
    cost: 3,
    title: "Library",
    body: "Draw One Card",
    imgSrc: "assets/cards/book.jpg",
    effect: (caster: Player | Enemy, target: Player | Enemy) => {
      caster.drawCards(2);
    },
  },
];

export let $cardDictionary: (() => Card)[] = [];

for (const card of cards) {
  const cardFunction = () => createCardElement(card);

  $cardDictionary.push(cardFunction);
}
