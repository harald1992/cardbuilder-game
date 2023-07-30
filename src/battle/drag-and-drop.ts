// export function $dragAndDrop() = {

//    function dragAndDropCards() {
//         const game = $store.getGame();
//         const canvas = $store.getGame().main.canvas;
//         canvas.addEventListener("mousedown", this.onMouseDown);
//       }

//       function   onMouseDown(event: Event) {
//         const game = $store.getGame();
//         const canvas = game.main.canvas;
//         const battleManager = game.battleManager;

//         game.battleManager.player.deck.cardsInHand.forEach((card: Card) => {
//           if (rectRectCollision(card, game.mouse) && !card.isUnPlayable) {
//             battleManager.selectedCard = card;

//             canvas.addEventListener("mousemove", battleManager.onMouseMove);

//             canvas.addEventListener("mouseup", battleManager.onMouseUp);
//           }
//         });
//       }

//       function onMouseMove(event: Event) {
//         const game = $store.getGame();

//         [game.battleManager.player, ...game.battleManager.enemies].forEach(
//           (unit: Unit) => {
//             if (rectRectCollision(game.mouse, unit)) {
//               unit.targetMark = true;
//             } else {
//               unit.targetMark = false;
//             }
//           }
//         );

//         const mouse = $store.getGame().mouse;
//         const selectedCard = game.battleManager.selectedCard;

//         if (selectedCard) {
//           selectedCard.xPercentage = mouse.xPercentage;
//           selectedCard.yPercentage = mouse.yPercentage;
//         }
//       }

//       function onMouseUp(event: Event) {
//         const game = $store.getGame();
//         const selectedCard = game.battleManager.selectedCard;

//         const target: Unit | undefined = [
//           game.battleManager.player,
//           ...game.battleManager.enemies,
//         ].find((unit: Unit) => rectRectCollision(unit, game.mouse));

//         if (target) {
//           selectedCard?.playCard(game.battleManager.player, target);
//           game.main.canvas.removeEventListener(
//             "mouseup",
//             game.battleManager.onMouseUp
//           );
//           game.main.canvas.removeEventListener(
//             "mousemove",
//             game.battleManager.onMouseMove
//           );

//           [game.battleManager.player, ...game.battleManager.enemies].forEach(
//             (unit: Unit) => {
//               unit.targetMark = false;
//             }
//           );

//           selectedCard?.deck.updateCardPositions();
//           game.battleManager.selectedCard = undefined;
//         } else {
//           selectedCard?.deck.updateCardPositions();
//           game.battleManager.selectedCard = undefined;

//           game.main.canvas.removeEventListener(
//             "mouseup",
//             game.battleManager.onMouseUp
//           );

//           game.main.canvas.removeEventListener(
//             "mousemove",
//             game.battleManager.onMouseMove
//           );
//         }
//       }

//       function  playPossibleCards(caster: Unit, target: Unit, resolve: Function) {
//         const possibleCardsToPlay = [...caster.deck.cardsInHand].filter(
//           (card: Card) => card.cost <= caster.currentMp && !card.isUnPlayable
//         );
//         if (possibleCardsToPlay.length === 0) {
//           return resolve();
//         }
//         const randomIndex = Math.floor(Math.random() * possibleCardsToPlay.length);
//         const randomCard = possibleCardsToPlay[randomIndex];
//         if (randomCard) {
//           randomCard.playCard(caster, target);
//         }
//         playPossibleCards(caster, target, resolve);
//       }

// };
