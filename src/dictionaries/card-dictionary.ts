import { Card } from "../classes/card";

type CardDictionary = { [key: number]: Card };

function createCardElement(
  cost: number = 0,
  title: string = "Title",
  body: string = "Body",
  imgSrc: string = "assets/units/crusader.webp",
  effect: (caster: any, target: any) => void = (caster: any, target: any) => {
    console.log("No effect yet for this card");
  }
): Card {
  const card = document.createElement("app-card") as Card;

  card.setAttribute("cost", cost.toString());

  card.setAttribute("cardTitle", title);
  card.setAttribute("cardBody", body);
  card.setAttribute("imgSrc", imgSrc);
  card.effect = effect;
  return card;
}

export const $cardDictionary: CardDictionary = {
  0: createCardElement(
    1,
    "Lighning spark",
    "Deal 1 damage",
    "assets/cards/lightning-spark.svg",
    (caster: any, target: any) => {
      console.log(caster, target);

      target.hp -= 1;
    }
  ),
  1: createCardElement(
    2,
    "Lighning bolt",
    "Deal 2 damage",
    "assets/cards/lightning-bolt.svg",
    (caster: any, target: any) => {
      target.hp -= 2;
    }
  ),
  2: createCardElement(
    1,
    "Healing Word",
    "Heal 1 hp",
    "assets/cards/heal.svg",
    (caster: any, target: any) => {
      caster.hp += 1;
    }
  ),
};
