import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";
import { Unit } from "./unit";

export class Player extends Unit {
  cards: Card[] = [];
  cardContainer: HTMLElement;

  constructor(game: Game) {
    const x = 0.2 * game.main.width;
    const y = 0.5 * game.main.height;
    const imgSrc = "assets/units/player-wizard.png";

    super(game, x, y, imgSrc);

    this.cardContainer = document.querySelector(
      "#card-container"
    ) as HTMLElement;

    for (let i = 0; i < 3; i++) {
      const card = $cardDictionary[i];
      this.cards.push(card);
    }
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    console.log("drawing");
    // console.log();

    // ctx.drawImage(this.image, this.x, this.y, 100, 100);
    // this.healthBar.draw(ctx);
  }

  renderCards() {
    this.cardContainer.style.display = "flex";
    this.cardContainer.innerHTML = "";

    this.cards.forEach((card: Card) => {
      this.cardContainer.appendChild(card);
    });
  }
}
