// import { Card } from "../classes/card";
// import { Enemy } from "../classes/enemy";
// import { Player } from "../classes/player";

// type CardDictionary = { [key: number]: Card };

// function createCardElement(
//   cost: number = 0,
//   title: string = "Title",
//   body: string = "Body",
//   imgSrc: string = "assets/units/crusader.webp",
//   effect: (caster: Player | Enemy, target: Player | Enemy) => void = (
//     caster: Player | Enemy,
//     target: Player | Enemy
//   ) => {
//     console.log("No effect yet for this card");
//   }
// ): Card {
//   const card = document.createElement("app-card") as Card;

//   card.setAttribute("cost", cost.toString());

//   card.setAttribute("cardTitle", title);
//   card.setAttribute("cardBody", body);
//   card.setAttribute("imgSrc", imgSrc);
//   card.effect = effect;
//   return card;
// }

// export const $cardDictionaryFN: (() => Card)[] = [
//   () => {
//     return createCardElement(
//       1,
//       "Lighning spark",
//       "Deal 1 damage",
//       "assets/cards/lightning-spark.svg",
//       (caster: Player | Enemy, target: Player | Enemy) => {
//         target.currentHp -= 1;
//       }
//     );
//   },
// ];

// const cards = [
//   {
//     cost: 1,
//     title: "Lightning Spark",
//     body: "Deal 1 damage",
//     imgSrc: "assets/cards/lightning-spark.svg",
//     effect: (caster: Player | Enemy, target: Player | Enemy) => {
//       target.currentHp -= 1;
//     },
//   },
// ];

// export let $cardDictionary: (() => Card)[] = [];

// for (const card of cards) {
//   const cardFunction = () => createCardElement(card);

//   $cardDictionary.push(cardFunction);
// }

// // export const $cardDictionary() => {

// // }

// // export const $cardDictionaryOld: CardDictionary = {
// //   0: createCardElement(
// //     1,
// //     "Lighning spark",
// //     "Deal 1 damage",
// //     "assets/cards/lightning-spark.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       console.log(caster, target);

// //       target.currentHp -= 1;
// //     }
// //   ),
// //   1: createCardElement(
// //     2,
// //     "Lighning bolt",
// //     "Deal 2 damage",
// //     "assets/cards/lightning-bolt.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       target.currentHp -= 2;
// //     }
// //   ),
// //   2: createCardElement(
// //     1,
// //     "Healing Word",
// //     "Heal 1 hp",
// //     "assets/cards/heal.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       caster.currentHp += 1;
// //     }
// //   ),

// //   3: createCardElement(
// //     1,
// //     "Lighning spark",
// //     "Deal 1 damage",
// //     "assets/cards/lightning-spark.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       console.log(caster, target);

// //       target.currentHp -= 1;
// //     }
// //   ),
// //   4: createCardElement(
// //     2,
// //     "Lighning bolt",
// //     "Deal 2 damage",
// //     "assets/cards/lightning-bolt.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       target.currentHp -= 2;
// //     }
// //   ),
// //   5: createCardElement(
// //     1,
// //     "Healing Word",
// //     "Heal 1 hp",
// //     "assets/cards/heal.svg",
// //     (caster: Player | Enemy, target: Player | Enemy) => {
// //       caster.currentHp += 1;
// //     }
// //   ),
// // };
