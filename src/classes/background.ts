import { Main } from "..";
import { Game } from "../game";

class Layer {
  main: Main;
  image: any;
  x = 0;
  y = 0;
  yOffset = 0;

  constructor(main: Main, image: HTMLImageElement, yOffset: number = 0) {
    this.main = main;
    this.yOffset = yOffset;

    this.image = image;
  }

  update() {}

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.x,
      this.y,
      this.main.width,
      this.main.height - this.yOffset,
    );
  }
}

export class Background {
  main: Main;
  layer1image: HTMLImageElement;
  layers: Layer[];

  constructor(main: Main, imageId = "main-menu", yOffset = 0) {
    this.main = main;

    this.layer1image = document.getElementById(imageId) as HTMLImageElement;

    this.layers = [new Layer(this.main, this.layer1image, yOffset)];
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
