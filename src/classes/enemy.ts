import { $cardDictionary } from "../dictionaries/card-dictionary";
import { Game } from "../game";
import { Card } from "./card";
import { Unit } from "./unit";

export class Enemy extends Unit {
  cards: Card[] = [];
  enemyCardContainer: HTMLElement;

  constructor(game: Game) {
    const x = 0.8 * game.main.width;
    const y = 0.5 * game.main.height;
    const imgSrc = "assets/units/monster-ghost.png";

    super(game, x, y, imgSrc);

    this.enemyCardContainer = document.querySelector(
      "#enemy-card-container"
    ) as HTMLElement;

    for (let i = 3; i < 5; i++) {
      const card = $cardDictionary[0]();
      card.setAttribute("isPlayersCard", "false");

      this.cards.push(card);
    }
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    // ctx.drawImage(this.image, this.x, this.y, 100, 100);
    // this.healthBar.draw(ctx);
  }

  renderCards() {
    this.enemyCardContainer.style.display = "flex";
    this.enemyCardContainer.innerHTML = "";

    this.cards.forEach((card: Card) => {
      this.enemyCardContainer.appendChild(card);
    });
  }
}
