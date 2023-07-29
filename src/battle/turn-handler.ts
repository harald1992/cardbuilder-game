// import { $store } from "../store";
// import { Unit } from "../units/unit";
// import { $utilService } from "../utils/utilService";
// import { rectRectCollision } from "../utils/utils";
// import { Card } from "./deck/card";

// type Action = {
//   name: string;
//   success: [{
//     type?: string;
//     text?: string;
//     damage?: number;
//   }];
// };

// export class TurnHandler {
//   caster: Unit;
//   enemy: Unit;

//   onComplete: any;

//   mouseClickListener = (event: Event) => {
//     const game = $store.getGame();

//     game.main.canvas.addEventListener("click", (e: Event) => {
//       const isPlayersTurn = game.battleManager.turnCycle?.isPlayersTurn;

//       if (!isPlayersTurn) {
//         return;
//       }
//       game.player.deck.cardsInHand.forEach((card: Card) => {
//         if (rectRectCollision(card, game.mouse)) {
//           if (isPlayersTurn) {
//             card.playCard(game.player, game.enemy);
//           }
//         }
//       });

//       if (rectRectCollision(game.ui.endTurnButton, game.mouse)) {
//         // game.turnHandler.switchTurns();
//         console.log('decide turnhandler');

//         this.decide("turnHandler");

//       }
//     });
//   };

//   constructor(caster: Unit, enemy: Unit, onComplete: any) {
//     this.caster = caster;
//     this.enemy = enemy;
//     this.onComplete = onComplete;
//   }

//   init() {
//     console.log(this.caster);
//     this.upkeep();

//     const isPlayer = this.caster.team === "player";
//     if (isPlayer) {

//       this.handlePlayerTurn();
//     } else {
//       this.handleAIAction();
//     }
//   }

//   upkeep() {
//     this.caster.deck.drawCards(5);
//     this.caster.currentMp = this.caster.maxMp;
//   }

//   handlePlayerTurn() {
//     // this.createActionMenu();
//     // this.addMovementListener();
//     this.addMouseClickListener();
//   }

//   handleAIAction() {
//     // this.randomAIMovement();
//   }

//   listenForMouseClick() {

//   }

//   addMouseClickListener() {
//     $store.getGame().main.canvas.addEventListener("click", this.mouseClickListener);
//   }

//   removeMouseClickListener() {
//     $store.getGame().main.canvas.removeEventListener("click", this.mouseClickListener);

//   }

//   // randomAIMovement() {
//   //   let options = [
//   //     { x: 0, y: -1 },
//   //     { x: 0, y: 1 },
//   //     { x: -1, y: 0 },
//   //     { x: 1, y: 0 },
//   //   ];
//   //   const possibleOptions = options.filter((option) => {
//   //     return $utilService.checkIfTerrainIsPassable(
//   //       this.caster.x + option.x,
//   //       this.caster.y + option.y
//   //     );
//   //   });
//   //   const randomNumber = utilService.getRandomNumberBetween(
//   //     0,
//   //     possibleOptions.length
//   //   );

//   //   this.caster.move(
//   //     possibleOptions[randomNumber].x,
//   //     possibleOptions[randomNumber].y
//   //   );
//   //   this.decide("Move");
//   // }

//   decide(actionName: string, target?: Unit) {
//     // this.removeMovementListener();
//     this.removeMouseClickListener();

//     const action: Action = { name: actionName, success: [{}] };

//     this.onComplete({
//       // action: actionDictionary[actionName],
//       action,
//       target,
//     });
//   }

//   // createActionMenu() {
//   //   const menuContainer = document.querySelector(".action-container");
//   //   this.removeChilds(menuContainer);
//   //   const actions = this.caster.actions;

//   //   for (let action of actions) {
//   //     const menuButton = document.createElement("button");
//   //     menuButton.className = "action-button";
//   //     menuButton.textContent = action;
//   //     menuContainer.appendChild(menuButton);
//   //   }

//   //   const menuButtons = menuContainer.querySelectorAll(".action-button");

//   //   for (const btn of menuButtons) {
//   //     btn.addEventListener("click", (event) => {
//   //       this.caster.sprite.changeCurrentAnimation("casting");

//   //       const actionName = event.target.textContent;
//   //       if (actionName == actionDictionary.Wait.name) {
//   //         this.decide(actionName);
//   //       }

//   //       window.addEventListener("click", (event) => {
//   //         const x = event.layerX;
//   //         const y = event.layerY;
//   //         const object = $utilService.findGameObjectByCoordinates(x, y);

//   //         if (object) {
//   //           this.decide(actionName, object);
//   //         }
//   //       });
//   //     });
//   //   }
//   // }

//   removeChilds(parent: any) {
//     while (parent.firstChild) {
//       parent.removeChild(parent.firstChild);
//     }
//   }

//   addMovementListener() {
//     window.addEventListener("keydown", this.handleKeyboardNavigation);
//   }

//   removeMovementListener() {
//     window.removeEventListener("keydown", this.handleKeyboardNavigation);
//   }

//   handleKeyboardNavigation = (event: KeyboardEvent) => {
//     const player = this.caster;

//     if (event.key) {
//       switch (event.key) {
//         case "Down":
//         case "ArrowDown":
//           event.preventDefault();
//           // player.move(0, 1);
//           this.decide("Move");
//           break;
//         case "Up":
//         case "ArrowUp":
//           event.preventDefault();
//           // player.move(0, -1);
//           this.decide("Move");
//           break;
//         case "Left":
//         case "ArrowLeft":
//           event.preventDefault();
//           // player.move(-1, 0);
//           this.decide("Move");
//           break;
//         case "Right":
//         case "ArrowRight":
//           event.preventDefault();
//           // player.move(1, 0);
//           this.decide("Move");
//           break;
//         case "Enter":
//         case "Spacebar":
//         case " ":
//           event.preventDefault();
//           break;
//         default:
//           return; // Quit when this doesn't handle the key event.
//       }
//     }
//   };
// }
