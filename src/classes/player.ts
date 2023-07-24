import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";

export class Player {
  game: Game;
  hp = 10;
  mp = 10;
  x = 100;
  y = 200;
  cards: Card[] = [];
  cardContainer: HTMLElement;
  image: HTMLImageElement = new Image();

  constructor(game: Game) {
    this.game = game;
    this.cardContainer = document.querySelector(
      "#card-container"
    ) as HTMLElement;
    this.x = 0.1 * this.game.width;
    this.y = 0.5 * this.game.height;

    this.image.src = "assets/units/crusader.webp";
    for (let i = 0; i < 3; i++) {
      const card = $cardDictionary[i];
      this.cards.push(card);
    }
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, 100, 100);
    ctx.fillStyle = "white";
    ctx.fillText("HP: " + this.hp, this.x, this.y - 20);
    ctx.fillText("MP: " + this.mp, this.x, this.y - 10);
  }

  renderCards() {
    this.cardContainer.style.display = "flex";

    // console.log(this.cardContainer);
    this.cardContainer.innerHTML = "";

    this.cards.forEach((card: Card) => {
      this.cardContainer.appendChild(card);
    });
  }
}
