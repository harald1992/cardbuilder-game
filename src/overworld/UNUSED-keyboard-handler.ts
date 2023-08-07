// import { Overworld } from "./overworld";

// export class KeyboardHandler {
//   overworld: Overworld;
//   constructor(overworld: Overworld) {
//     this.overworld = overworld;
//     this.addMovementListener();
//   }

//   addMovementListener() {
//     window.addEventListener("keydown", this.handleKeyboardNavigation);
//   }

//   removeMovementListener() {
//     window.removeEventListener("keydown", this.handleKeyboardNavigation);
//   }

//   handleKeyboardNavigation = (event: KeyboardEvent) => {
//     let player = this.overworld.overworldPlayer;
//     console.log(event);

//     if (event.key) {
//       switch (event.key) {
//         case "Down":
//         case "ArrowDown":
//           event.preventDefault();
//           player.move(0, 1);
//           //   this.decide("Move");
//           break;
//         case "Up":
//         case "ArrowUp":
//           event.preventDefault();
//           player.move(0, -1);
//           //   this.decide("Move");
//           break;
//         case "Left":
//         case "ArrowLeft":
//           event.preventDefault();
//           player.move(-1, 0);
//           //   this.decide("Move");
//           break;
//         case "Right":
//         case "ArrowRight":
//           event.preventDefault();
//           player.move(1, 0);
//           //   this.decide("Move");
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
