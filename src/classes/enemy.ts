import { Game } from "../game";

export class Enemy {
  game: Game;
  x = 500;
  y = 200;
  hp: number = 5;
  mp = 10;

  image = new Image();

  constructor(game: Game) {
    this.game = game;
    this.x = 0.5 * this.game.width;
    this.y = 0.5 * this.game.height;
    this.image.src = "assets/units/crusader.webp";
  }

  update(deltaTime: number) {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, 100, 100);
    ctx.fillStyle = "white";
    ctx.fillText("HP: " + this.hp, this.x, this.y - 20);
    ctx.fillText("MP: " + this.mp, this.x, this.y - 10);
  }
}
