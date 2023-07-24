import { Game } from "../game";

class Layer {
  game: Game;
  width: number = 0;
  height: number = 0;
  speedModifier = 0;
  image: any;
  x = 0;
  y = 0;

  constructor(
    game: Game,
    imgWidth: number,
    imgHeight: number,
    speedModifier = 0,
    image: any
  ) {
    this.game = game;
    this.width = imgWidth;
    this.height = imgHeight;
    this.speedModifier = speedModifier;
    this.image = image;
  }

  update() {
    // if (this.x < -this.width) {
    //   // reset background
    //   this.x = 0;
    // } else {
    //   this.x -= this.game.speed * this.speedModifier;
    // }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class Background {
  game: Game;
  layer1image: HTMLImageElement;
  layers: Layer[];
  width = 0;
  height = 0;

  constructor(game: Game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;

    this.layer1image = document.getElementById(
      "background1"
    ) as HTMLImageElement;

    this.layers = [
      new Layer(this.game, this.width, this.height, 0, this.layer1image),
    ];
  }

  update() {
    this.layers.forEach((layer) => {
      layer.update();
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
}
