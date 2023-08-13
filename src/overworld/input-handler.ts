import { Overworld } from "./overworld";

const keyboardOptions = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Enter",
];

export class InputHandler {
  overworld: Overworld;

  keys: any = {};

  constructor(overworld: Overworld) {
    this.overworld = overworld;
    this.addListeners();
  }

  addListeners() {
    document.addEventListener("keydown", (event) => {
      this.keys[event.code] = true;
    });

    // Handle key up events
    document.addEventListener("keyup", (event) => {
      this.keys[event.code] = false;
    });
  }

  isAnyOfTheKeys(event: KeyboardEvent) {
    return keyboardOptions.some((val) => val === event.key);
  }
}
