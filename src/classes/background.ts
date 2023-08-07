import { Main } from "..";
import { Game } from "../game";
import { GameObject } from "./game-object";

class Layer extends GameObject {
  image: HTMLImageElement;

  constructor(game: Game, image: HTMLImageElement) {
    super(game, 0, 0, 1, 1);

    this.image = image;
  }

  mainDraw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

export class Background extends GameObject {
  layer1image: HTMLImageElement;
  layers: Layer[];

  constructor(game: Game, imageId = "img-main-menu") {
    super(game, 0, 0, 1, 1);

    this.layer1image = document.getElementById(imageId) as HTMLImageElement;

    this.layers = [new Layer(this.game, this.layer1image)];
  }

  update(deltaTime: number) {
    super.update(deltaTime);
    this.layers.forEach((layer) => {
      layer.update(deltaTime);
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => {
      layer.draw(ctx);
    });
  }
}
